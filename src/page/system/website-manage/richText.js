import React from 'react';
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image','color'
]


class richText extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const {value,textChange} = this.props
    return(
      <ReactQuill
        style={{height:'400px',marginBottom:'60px'}}
        value={value}
        modules={modules}
        formats={formats}
        placeholder="请输入正文内容....."
        onChange={textChange}
      />
    )
  }
}

export default  richText
