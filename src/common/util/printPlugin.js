/**
 * Created by Flyforwards on 2017/8/21.
 */
const do_print = (id_str) =>
{
  var el = document.getElementById(id_str);
  var iframe = document.createElement('iframe');
  var doc = null;
  iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
  document.body.appendChild(iframe);
  doc = iframe.contentWindow.document;
// 引入打印的专有CSS样式，www.111Cn.net根据实际修改
  doc.write('<LINK rel="stylesheet"   href="http://cdn.bootcss.com/antd/2.10.4/antd.min.css" />');
  doc.write('<LINK rel="stylesheet"   href="http://dev.hbbcare.com/health.css" />');
  doc.write('<div>' + el.innerHTML + '</div>');
  doc.close();
  iframe.contentWindow.focus();
  setTimeout(function(){
    iframe.contentWindow.print();
  },1000)
  if (navigator.userAgent.indexOf("MSIE") > 0)
  {
    document.body.removeChild(iframe);
  }
}

module.exports = {
  do_print
}

