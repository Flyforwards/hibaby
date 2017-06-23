/**
 * Created by matrix on 17/5/12.
 */
const do_print = (id_str,dataId,choiceValue) =>
{
  console.log(dataId,choiceValue)
  var el = document.getElementById(id_str);
  var iframe = document.createElement('iframe');
  var doc = null;
  iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
  iframe.setAttribute("src",'/print?dataId='+dataId+'&choiceValue='+choiceValue+'');
  document.body.appendChild(iframe);
  // 引入打印的专有CSS样式，www.111Cn.net根据实际修改
  // doc.write('<LINK rel="stylesheet" type="text/css" media="print" href="http://192.168.199.81/printPage.css" />');
  // doc.write('<div>' + el.innerHTML + '</div>');

  iframe.contentWindow.focus();
  setTimeout(function(){
    iframe.contentWindow.print();
  },3000)

  if (navigator.userAgent.indexOf("MSIE") > 0)
  {
    document.body.removeChild(iframe);
  }
}

module.exports = {
  do_print
}



