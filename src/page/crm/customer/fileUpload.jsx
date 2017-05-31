import { Upload, Icon,Button, Modal } from 'antd';
import React from 'react';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
  };

   beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('只支持jpg和png格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };


  state = {
    previewVisible: false,
    previewImage: '',
    defaultFileList : (typeof this.props.value === 'object') ? this.props.value : [],
    fileList: [],
    value: (typeof this.props.value === 'object') ? this.props.value : [],
  };

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

  onChange = ( {file,fileList} ) => {
    if (file.status === 'done') {
      this.props.fun({name:file.response.data.fileKey, url:file.response.data.fileUrlList[0]})
    }
    this.setState({
      fileList,
    })
  }

  render() {
    const {defaultFileList, previewVisible, previewImage, fileList} = this.state;

    return (
      <div>
        <Upload
          name="file"
          action="/crm/api/v1/uploadImg"
          showUploadList = {!this.props.isHead}
          // fileList={fileList}
          defaultFileList={defaultFileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.onChange}
          onRemove={this.onRemove}
        >
          {this.props.children}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
