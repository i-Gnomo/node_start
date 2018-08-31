var fs = require("fs");
var fileDir = "temp";
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
        files.forEach(function(file) {
            var phone = file.substring(file.length - 6, file.length);
            var newFilename = fileDir + '/' + phone;
            fs.rename(fileDir + '/' + file, newFilename, function(err) {
                if (err) {
                    throw err
                }
            })
        })
    })
} else {
    console.log('Not Found!');
}