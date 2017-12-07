import React from 'react';
import { connect } from 'dva';
import "./archives.scss"
import { Upload, Icon, Modal } from 'antd';
import {local, session} from '../../../common/util/storage.js'


class PicturesWall extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [...props.oldImg],
    };
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {

    this.props.imgChange(fileList.map(value=>{
      if (value.status === 'done') {
        if (value.response){
          return { url:value.response.data.fileUrlList[0]}
        }
        else {
          return { url:value.url}
        }
      }
    }))
    this.setState({ fileList })
  }

  onRemove = (e) => {
    if (this.props.disabled){
      return false
    }
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { disabled } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          name="file"
          action="/crm/api/v1/uploadImg"
          headers={{'USER-TOKEN':session.get("token")}}
          fileList={fileList}
          onRemove={this.onRemove}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 || disabled ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default {PicturesWall};
