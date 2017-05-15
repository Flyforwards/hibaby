import { Upload, Icon, Modal ,message} from 'antd';
import React, {Component} from 'react'
import {local, session} from 'common/util/storage.js'
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
  const isLt2M = file.size / 1024 / 1024 < 2;
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
  state = {};
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    let URl = null
    const props = {
      name: 'file',
      multiple: false,
      showUploadList: false,
      action: '/crm/api/v1/uploadImg',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          let len = info.fileList.length
          URl = info.fileList[len-1].response.data.fileUrlList[0]
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        {...props}
        className="avatar-uploader"
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}

export default Avatar