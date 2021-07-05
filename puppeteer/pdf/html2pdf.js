const pdf = require('html-pdf');
(async () => {
    pdf.create('https://www.baidu.com').toStream(function(err, stream){
        stream.pipe(fs.createWriteStream('./foo.pdf'));
    });
})();
