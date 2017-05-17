
function xxx() {

  // 根据元素查找下标
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };

  // 移除元素
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  Array.prototype.removeRepeatAttr = function(){
    var tmp={},a=this.slice();
    let j = 0;
    for( let i = 0;i<a.length;i++){
      if(!tmp[a[i].id]){
        tmp[a[i].id]=!0;
        j++;
      }else{
        this.splice(j,1);
      }
    };
  }

}

xxx()

const manager = {
  // 冒泡排序 // 由小到大
  bubbleSort: function (array) {
    var i = 0,
      len = array.length,
      j, d;
    for (; i < len; i++) {
      for (j = 0; j < len; j++) {
        if (array[i].serialNumber < array[j].serialNumber) {
          d = array[j];
          array[j] = array[i];
          array[i] = d;
        }
      }
    }
    return array;
  }
}

export default manager;






