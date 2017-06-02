import React from 'react';
import Lightbox from 'react-images';
import './customerInformation.scss';

class BigImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentImage:0,
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }

  onClose(){
    this.props.onClose();
    this.setState({
      currentImage: 0,
    });
  }

  render() {
    const imageAry = [];

    for (let i = 0; i < this.props.images.length; i++) {
      let dict = this.props.images[i];
      imageAry.push({src: dict.url})
    }
    return (
      <Lightbox
        images={imageAry}
        backdropClosesModal={true}
        isOpen={this.props.isOpen}
        onClose={this.onClose.bind(this)}
        showThumbnails={imageAry.length>1}
        currentImage={this.state.currentImage}
        onClickThumbnail={this.gotoImage.bind(this)}
        onClickPrev={this.gotoPrevious.bind(this)}
        onClickNext={this.gotoNext.bind(this)}
      />
    )
  }

}

export default BigImageModal
