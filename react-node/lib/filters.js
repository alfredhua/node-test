const filters = function (env) {
    env.addFilter('get_fund_type', function (type) {
        let fund_type;
        switch (type) {
            case 'MM':
                fund_type = '货币型';
                break;
            case 'BOND':
                fund_type = '债券型';
                break;
            case 'MIXED':
                fund_type = '混合型';
                break;
            case 'CP':
                fund_type = '保本型';
                break;
            case 'EQ':
                fund_type = '股票型';
                break;
            case 'AI':
                fund_type = '另类型';
                break;
            case 'INDEX':
                fund_type = '指数型';
                break;
            case 'ST':
                fund_type = '分级型';
                break;
            case 'UNKNOWN':
                fund_type = '其他';
                break;
        }
        return fund_type;
    });

    env.addFilter('get_fund_status', function (status) {
        let fund_status;
        switch (status) {
            case '0':
                fund_status = '募集期基金';
                break;
            case '1':
                fund_status = '申购期基金';
                break;
            case '2':
                fund_status = '封闭期基金';
                break;
            case '3':
                fund_status = '已清盘的基金';
                break;
        }
        return fund_status;
    });

    env.addFilter('delete_quotes', function (str) {
        return str.slice(1, str.length-1);
    });

    env.addFilter('get_Integer', function (num) {
        if (num == null) {
            return null;
        }
        return parseInt(num);
    });

    env.addFilter('get_float', function (num) {
        if (num == null) {
            return null;
        }
        num = num.toString();
        return num.slice(num.indexOf('.'), num.length);
    });
    
    env.addFilter('get_riskAppetite', function (str) {
        let result;
        switch (str) {
            case 1: 
                result = '保守型';
                break;
            case 2: 
                result = '中度保守型';
                break;
            case 3: 
                result = '平衡型';
                break;
            case 4: 
                result = '中度进取型';
                break;
            case 5: 
                result = '进取型'; 
                break;
            default:
                result = '您还未进行风险测评';
        }
        return result;
    });

    env.addFilter('last4',function(str){
        var len = str && str.length || 0;
         if(len > 4){
             return str.slice(len-4);
         }else{
             return str;
         }
    });

    env.addFilter('convert_no',function(str, unit){
        // unit 为转换单位，1代表十元，2代表百元，3代表千元，4代表万元
        let result;
        switch(unit) {
            case '1':
                result = parseInt(str) / 10;
                break;
            case '2':
                result = parseInt(str) / 100;
                break;
            case '3':
                result = parseInt(str) / 1000;
                break;
            case '4':
                result = parseInt(str) / 10000;
                break;
        }
        return result;
     });

    env.addFilter('format_to_date',function(ms) {
        if (!ms) return '';
        var date = new Date(ms),
            year = date.getFullYear(),
            month = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    });

    env.addFilter('format_to_date2',function(ms) {
        if (!ms) return '';
        var date = new Date(ms),
            year = date.getFullYear(),
            month = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return year + '年' + month + '月' + day + '日';
    });
}

module.exports=filters;

