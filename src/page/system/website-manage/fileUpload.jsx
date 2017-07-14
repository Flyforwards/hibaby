import { Upload, message, Modal } from 'antd';
import React from 'react';
import {local, session} from 'common/util/storage.js'

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      defaultFileList : this.props.defaultFileList ,
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
    console.log("file",file);
    this.setState({
      previewImage: file.url ?file.url: file.response.data.fileUrlList[0],
      previewVisible: true,
    });
  }

  onRemove = (file) => {
    this.props.deleteImgFun({name:file.response?file.response.data.fileKey:file.name, url:file.response?file.response.data.fileUrlList[0]:file.url})
  }

  handleChange = ( {file, fileList} ) => {
    const _this = this;

    if (file.status === "uploading"){
      console.log("图片正在上传....");
    }

    if (file.status === 'done') {
      console.log("img",file.response.data.fileKey);
      _this.props.addImgFun({name:file.response.data.fileKey, url:file.response.data.fileUrlList[0]})
      console.log("图片上传成功....");
    }

    this.setState({
      fileList
    })
  }



  render() {
    const { previewVisible, previewImage, fileList} = this.state;
    const { defaultFileList } = this.props;
    return (
      <div>
        <Upload
          key={defaultFileList}
          name="file"
          action="/crm/api/v1/uploadImg"
          headers={{'USER-TOKEN':session.get("token")}}
          showUploadList = {true}
          defaultFileList={defaultFileList}
          filelist={fileList}
          multiple={true}
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

export default FileUpload;
