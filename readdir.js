var fs = require("fs");
var fileDir = "temp";
var newJson = [];
if (fs.existsSync(fileDir)) {
    fs.stat(fileDir, function(err, stats) {
        if (err) {
            return console.error(err);
        }
        console.log('信息:' + stats.isDirectory());
    })
    fs.readdir(fileDir, function(err, files) {
        if (err) {
            return console.error(err);
        }
        var filestr = JSON.parse(fs.readFileSync("mp3.json"));
        files.forEach(function(file) {
            var phone = file.substring(25, 36);
            for (let x = 0; x < filestr.rows.length; x++) {
                if (filestr.rows[x]['phone'] == phone) {
                    console.log(phone, filestr.rows[x]['code']);
                    var _item = {};
                    _item["code"] = filestr.rows[x]['code'];
                    _item["record"] = 'http://static.new4s.com/new4s-sales/record/854/' + filestr.rows[x]['code'] + '.mp3';
                    newJson.push(_item);
                    var newFilename = fileDir + '/' + filestr.rows[x]['code'] + '.mp3';
                    fs.rename(fileDir + '/' + file, newFilename, function(err) {
                        if (err) {
                            throw err
                        }
                    })
                }
                if ((x == filestr.rows.length - 1) && newJson.length > 0) {
                    fs.writeFile('newurl.json', JSON.stringify(newJson), function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log("数据写入成功！");
                    })
                }
            }
        })
    })
} else {
    console.log('Not Found!');
}