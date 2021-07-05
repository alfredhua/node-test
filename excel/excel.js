var XLSX = require('xlsx');
var datas = require('./data.json');

(async()=>{

// for(var i=0;i<datas.data.length;i++){
//     console.log(datas.data[i],"-----------")
// }

let ss = XLSX.utils.json_to_sheet(datas.data);

// var ws = XLSX.utils.json_to_sheet(datas);    
// console.log(ws)

let workbook = { //定义操作文档
    SheetNames:['nodejs-sheetname'], //定义表明
    Sheets:{
        'nodejs-sheetname':Object.assign({},ss,{}) //表对象[注意表明]
    },
}

XLSX.writeFile(workbook,"./zhiyuanb.xls"); //将数据写入文件

})();