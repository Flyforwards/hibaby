import { Upload, Icon,Button, Modal } from 'antd';
import React from 'react';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || '';
    let valueString = '';
    if (value.length  > 0) {
      value.map((e) => {
        valueString = `${valueString ? valueString + ',' : ''}${e.url}`;
      })
    }

    this.state = {
      previewVisible: false,
      previewImage: '',
      defaultFileList : (typeof this.props.value === 'object') ? this.props.value : [],
      fileList: [],
      valueString
    };

  };

  beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isBMP = file.type === 'image/bmp';
  const isPNG = file.type === 'image/png';
  const isEMF = file.type === 'image/emf';
  const isTAG = file.type === 'image/tag';
  const isTIF = file.type === 'image/tif';

  if (!(isJPG || isPNG || isBMP || isEMF || isTIF || isTAG)) {
    message.error('你上传的图片格式不正确');
    return isJPG || isPNG
  }else{
    const isLt2M = file.size / 1024 / 1024 < 15;
    if (!isLt2M) {
      message.error('图片已经超过图片限定大小15MB!');
      return false;
    }
    return isLt2M ;
  }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.response.data.fileUrlList[0],
      previewVisible: true,
    });
  }

  onRemove = (file) => {
    this.props.deleteFun({name:file.response.data.fileKey, url:file.response.data.fileUrlList[0]});
  }

  handleChange = ( {file,fileList} ) => {
    if (file.status === 'done') {
      this.props.fun({name:file.response.data.fileKey, url:file.response.data.fileUrlList[0]})
      let valueString = `${this.state.valueString ? this.state.valueString + ',' : ''}${file.response.data.fileKey}`;
      this.setState({
        valueString: valueString
      })
      // console.log('upload:valueString>>', valueString);
    }

    this.setState({
      fileList
    })

    this.triggerChange({valueString});
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state.valueString, changedValue));
    }
  }

  render() {
    const {defaultFileList, previewVisible, previewImage, fileList} = this.state;
    return (
      <div>
        <Upload
          name="file"
          action="/crm/api/v1/uploadImg"
          showUploadList = {!this.props.isHead}
          defaultFileList={defaultFileList}
          filelist={fileList}
          beforeUpload={this.beforeUpload.bind(this)}
          onPreview={this.handlePreview.bind(this)}
          onChange={this.handleChange.bind(this)}
          onRemove={this.onRemove.bind(this)}
        >
          {this.props.children}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img  style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
