import { Upload, Icon, Modal ,message} from 'antd';
import React, {Component} from 'react'
import {local, session} from 'common/util/storage.js'
import IMG from 'common/img.png'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
     imageUrl:null
    }
  }
  state = {
    error: false,
  };
  handleChange = (info) => {
    const status = info.file.status;
        if (status !== 'uploading') {

        }
        if (status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl,error: false }));
          const len = info.fileList.length;
          const fileKey = info.fileList[len-1].response.data.fileKey
          this.props.headelUserImg(fileKey)
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }

  }
  onError() {
    this.setState({
      error: true,
    })
  }

  render() {
    let imageUrl = null
    let display = 'block'
    const props = {
      name: 'file',
      multiple: false,
      showUploadList: false,
      action: '/crm/api/v1/uploadImg',
      className: "avatar-uploader",
    };
    if(this.state.imageUrl){
      imageUrl = this.state.imageUrl;
    }else if(this.props.urlList){
      imageUrl = this.props.urlList
    }
    console.log("this.state.error",this.state.error)
    if ( this.state.error ) {
      imageUrl = IMG;
    }
    return (
      <Upload
        {...props}
        onChange = { this.handleChange.bind(this) }
      >  
        {
          imageUrl ?
            <img src={ imageUrl } alt="头像" className="avatar" onError={ this.onError.bind(this) }/> :<Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}

export default Avatar