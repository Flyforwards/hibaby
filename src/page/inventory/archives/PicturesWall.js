import React from 'react';
import { connect } from 'dva';
import "./archives.scss"
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
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
        return {name:value.response.data.fileKey, url:value.response.data.fileUrlList[0]}
      }
    }))
    this.setState({ fileList })
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
          action="/crm/api/v1/uploadImg"
          listType="picture-card"
          fileList={fileList}
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
