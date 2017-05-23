import React from 'react';
import {Upload,message} from 'antd';

//上传
export default function FileUpload({children,fun,isHead=false}) {

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      callback(reader.result);
    });
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    if (!isHead){
      return true;
    }
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' ;
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  const uploadIdcardFileProps = {
    name: 'file',

    beforeUpload:beforeUpload,
    showUploadList : !isHead,
    action: isHead ?  '/crm/api/v1/uploadImg' : '/crm/api/v1/uploadEnclosure',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 0)
        {
          if (isHead){
            // function headFun(filekey) {
            //   fun(filekey);
            // }



            fun({key:info.file.response.data.fileKey,url:info.file.response.data.fileUrlList[0]});
            // getBase64(info.file.originFileObj, headFun );
          }
          else {
            const array = [];
            for (let i = 0 ;i<info.fileList.length;i++)
            {
              const uploadFile =  info.fileList[i];
              array.push(uploadFile.response.data.fileKey)
            }
            fun(array);
          }
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return(
    <Upload {...uploadIdcardFileProps}>{children}</Upload>
  )
}

