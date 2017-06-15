/**
 * Created by matrix on 17/5/12.
 */
const do_print = (id_str) =>
{
  var el = document.getElementById(id_str);
  var iframe = document.createElement('iframe');
  var doc = null;
  iframe.setAttribute('style', 'position:absolute;width:100%;height:1000px;left:0px;top:0px;z-index:199');
  document.body.appendChild(iframe);
  doc = iframe.contentWindow.document;
  // 引入打印的专有CSS样式，www.111Cn.net根据实际修改
  doc.write('<LINK rel="stylesheet" type="text/css" href="http://192.168.199.81/printPage.css" />');
  doc.write('<div>' + el.innerHTML + '</div>');
  doc.close();
  //iframe.contentWindow.focus();
  // setTimeout(function(){
  //   iframe.contentWindow.print();
  // },3000)
  
  // if (navigator.userAgent.indexOf("MSIE") > 0)
  // {
  //   document.body.removeChild(iframe);
  // }
}

module.exports = {
  do_print
}



