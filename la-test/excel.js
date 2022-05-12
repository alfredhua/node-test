var XLSX = require('xlsx');
var datas = require('./data.json');
const axios = require('axios');
const fs = require('fs');
const strea = require('stream');
var iconv = require('iconv-lite');
var path = require('path');

(async()=>{

	const instance = axios.create();
	instance.defaults.headers.common['authorization'] = datas.auth;
	instance.defaults.headers.common['cookie'] = datas.cookie;
	instance.defaults.headers.common['timeout'] = 50000;
	//课程id
	var courseIds=datas.ids;
	var rows=[];
	var i=0;
	for(var index in courseIds){
		const courseId=courseIds[index];
		const courseResponse= await instance.get("https://www.luminaedu.com/api/v1/courseItem/assignmentList?page=1&limit=100000&courseId="+courseId);
		if(courseResponse.data.code=='200'){
			const operationItems=courseResponse.data.data.items;
			//获取作业
			for(var oIndex in operationItems){
				const operation=operationItems[oIndex];
				const operationId = operation.id;
				//作业名称
				const operationName = operation.name;
				const personResponse=await instance.get('https://www.luminaedu.com/api/v1/studentAssignment/list?itemId='+operationId+'&courseId='+ courseId+'&page=1&limit=50&status=0');
				if(personResponse.data.code=='200'){
					const personItems=personResponse.data.data.items;
					for(var pIndex in personItems){
						//获取提交的作业
						const person=personItems[pIndex];
						const userId=person.user_id;
						const userName=person.user_name;
						const url="https://www.luminaedu.com/course/"+courseId+"/book/assignment/"+operationId+"/"+userId+"/0";
						// 寻找作业文件
						const fileResponse=await instance.get('https://www.luminaedu.com/api/v1/gradebook/quickGradeData?courseId='+courseId+'&itemId='+operationId+'&userId='+userId);

						if(fileResponse.data.code=='200'){
							const answer_model=fileResponse.data.data.answer_model;
							for(var fIndex in answer_model.attachment_data){
								const file=answer_model.attachment_data[fIndex];
								const downLink=file.download_link;
								const resp= await instance.get(downLink);
								const filepath='./'+courseId+"/"+operationId+'-'+operationName+"/"+userId+"-"+userName;
								i++;
								try{
									if(!fs.existsSync(filepath)){
										await down_file(downLink,filepath,i);
									}
								}catch(e){
									console.log("执行错误!"+filepath)
								}
								console.log("----执行中，下载成功:"+filepath);
							    rows.push({courseId,operationId,operationName,userId,userName,url,filepath});
							}
						}
					}
				}
			}
		}
	}
	if(rows.length ==0){
		console.log("执行失败！");
	}else{
		console.log("开始生成excel");
		let ss = XLSX.utils.json_to_sheet(rows);
		let workbook = { //定义操作文档
			SheetNames:['nodejs-sheetname'], //定义表明
			Sheets:{
				'nodejs-sheetname':Object.assign({},ss,{}) //表对象[注意表明]
			},
		}
		XLSX.writeFile(workbook,"./date.xls"); //将数据写入文件
		console.log("执行完成！");
	}

})();


function mkdir(dirname){
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdir(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
}

async function down_file(url, filepath,i) {
	mkdir(filepath)
	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
		headers:{
			'authorization':datas.auth,
			'cookie':datas.cookie,
			'Content-Type':'text/html; charset=utf-8'
		}
	});
	console.log("执行中"+i);
	var disp=response.headers['content-disposition']
	var name1=disp.substring(disp.indexOf('=')+2,disp.length);
	var name = iconv.decode(name1,'UTF-8').replace("\"","");
	const writer = fs.createWriteStream(filepath +"/"+name);
	response.data.pipe(writer);
	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});

}
