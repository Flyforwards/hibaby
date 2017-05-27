import React from 'react';
import { Modal, Button ,Carousel} from 'antd';
import './customerInformation.scss';

export default function BigImageModal (props) {

  const imageAry = [];

  for (let i = 0;i<props.bigImageData.length;i++){
    imageAry.push(<div ><img className="bigImage" src={props.bigImageData[i]} alt="" /></div> )
  }


  function onChange() {

  }

  return (
    <div className="bigImageModal">
      <Modal
        visible={props.visible}
        onCancel={props.handleCancel}
        footer={null}
      >

        <Carousel afterChange={onChange}>
          {imageAry}
        </Carousel>

      </Modal>
    </div>
  )
}
