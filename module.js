// var name;
// exports.setName = function(thyname) {
//     name = thyname;
// }
// exports.sayHello = function() {
//     console.log('Hello ' + name);
// }

function Hello() {
    var name;
    this.setName = function(myname) {
        name = myname;
    }
    this.sayHello = function() {
        console.log('wow~ Hello ' + name);
    }
}
// exports.Hello = Hello; //在其他模块引用时用 var hello = require("./module").Hello
module.exports = Hello;