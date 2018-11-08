(x => x * 3)(3)

//let const
{
    let a = 10;
    var b = 1;
}
// a;
// b;

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    }
}
a[6]();

for (let j = 0; j < 3; j++) {
    let j = 'abc';
    console.log(j);
}

//在let变量声明之前使用 会进入暂时性死区
function bar(x = 2, y = x) {
    console.log([x, y]);
    return [x, y];
}
bar();

function func(arg) {
    // let不允许在相同作用域内重复声明同一个变量
    // let arg; //报错
}

//用来计数的循环变量泄露为全局变量
var xxxx = 'hello';
for (var xx = 0; xx < xxxx.length; xx++) {
    console.log(xxxx[xx]);
}
console.log(xx); //xx忽然就成为一个全局变量了

(function() { var tmp = 'world;' }()); //一个立即执行函数表达式IIFE
// console.log(tmp); //报错tmp is not defined

function f() {
    console.log('Im a function outside');
}
(function() {
    if (false) {
        function f() {
            console.log('Im a function inside');
        }
        //避免在块级作用域内声明函数
    }
    //可以写成函数表达式
    let f = function() { console.log('7788'); };
    f();
}());

//const声明一个只读常量不可更改声明时必须赋值 const作用域与let相同
const PI = 3.1415926;
console.log(PI);
// PI = 3.14; //报错 不能再次赋值

const foo = {};
foo.prop = 123;
console.log(foo.prop);
// foo = {}; //报错
foo.prop2 = '999';
console.log(foo); //{ prop: 123, prop2: '999' }

//将对象冻结??? Object.freeze({});

//es6声明变量的6中方法 var function let const import class

//解构赋值
var url = 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment';
var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL);
var [, protocal, fullhost, fullpath] = parsedURL;
console.log(protocal, fullhost, fullpath);

var myObj = { a: '1', b: '2' };
var { a, b } = myObj;
console.log(a, b);

var c, d;
({ c, d } = { c: '3', d: '4' });
console.log(c, d);
//给新的变量名赋值
var { c: tmp01, d: tmp02 } = { c: '3', d: '4' };
console.log(tmp01, tmp02);

//解构嵌套对象和数组
var metadata = {
    title: "Scratchpad",
    translations: [{
        locale: "de",
        localization_tags: [],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
    }],
    url: "/en-US/docs/Tools/Scratchpad"
};
var { title: metatitle, translations: [{ title: localtitle }] } = metadata;
console.log(metatitle, localtitle);

//For Of 迭代和解构赋值
var people = [{
    name: 'cindy',
    family: {
        father: 'blues',
        mother: 'jazze',
        sister: 'classical'
    }
}, {
    name: 'mikky',
    family: {
        father: 'hahaha',
        mother: 'hehehe',
        brother: 'heiheihei'
    }
}];

for (var { name: _n, family: { father: _p } }
    of people) {
    console.log('Name:' + _n, 'Father:' + _p);
}