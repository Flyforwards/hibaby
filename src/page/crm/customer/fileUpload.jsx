import { Upload, message, Modal } from 'antd';
import React from 'react';
import {local, session} from 'common/util/storage.js'

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.loading = false;
    console.log(this.props.value);

    this.state = {
      previewVisible: false,
      previewImage: '',
      defaultFileList : (typeof this.props.value === 'object') ? this.props.value : [],
      fileList: [],
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
    this.props.deleteFun({name:file.response?file.response.data.fileKey:file.name, url:file.response?file.response.data.fileUrlList[0]:file.url})
  }

  handleChange = ( {file, fileList} ) => {

    if(this.props.loadProgress){
      if (file.status === "uploading")
      {
        this.loading = true;

      }else {
        this.loading = false;
      }
      this.props.loadProgress(this.loading);
    }

    if (file.status === 'done') {
      this.props.fun({name:file.response.data.fileKey, url:file.response.data.fileUrlList[0]})
    }

    this.setState({
      fileList
    })
  }



  render() {
    const {defaultFileList, previewVisible, previewImage, fileList} = this.state;

    return (
      <div>
        <Upload
          name="file"
          action="/crm/api/v1/uploadImg"
          headers={{'USER-TOKEN':session.get("token")}}
          showUploadList = {!this.props.isHead}
          defaultFileList={defaultFileList}
          filelist={fileList}
          multiple={!this.props.isHead || this.props.multiple}
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
