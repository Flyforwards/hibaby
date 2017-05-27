import { Upload, Icon,Button, Modal } from 'antd';
import React from 'react';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
  };

   beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
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
    fileList: [],
    value:this.props.value || [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.response.data.fileUrlList[0] || file.url,
      previewVisible: true,
    });
  }

  onChange = ({ fileList }) => {
    this.setState({
      fileList,
      value:fileList
    })
  }

  render() {
    const { previewVisible, previewImage, fileList} = this.state;

    return (
      <div className="clearfix">

        <Upload
          name="file"
          action="/crm/api/v1/uploadImg"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.onChange}
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
