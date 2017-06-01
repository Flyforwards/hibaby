import React from 'react';
import { Modal ,Carousel} from 'antd';
import './customerInformation.scss';

export default function BigImageModal (props) {
  const imageAry = [];
  for (let i = 0;i<props.bigImageData.length;i++){
    imageAry.push(<div key={i}  className="bigDiv"> <img src={props.bigImageData[i].url} alt="" /></div>)
  }


  function onChange() {

  }

  return (
      <Modal
        visible={props.visible}
        onCancel={props.handleCancel}
        footer={null}
        className="bigImageModal"
      >

        <Carousel afterChange={onChange}>
          {imageAry}
        </Carousel>

      </Modal>
  )
}
