export default (list,listName,data,dataName)=>{
	
	for(var i=0;i<list.length;i++){

		for(var n=0;n<data.length;n++){

			if(list[i][listName]==data[n][dataName]){
				list[i].mainName=data[n].name
				
			}
		}
	}
	return list
}