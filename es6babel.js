'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function (x) {
    return x * 3;
})(3);

//let const
{
    var _a = 10;
    var b = 1;
}
// a;
// b;

var a = [];

var _loop = function _loop(i) {
    a[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}
a[6]();

for (var j = 0; j < 3; j++) {
    var j = 'abc';
    console.log(j);
}

//在let变量声明之前使用 会进入暂时性死区
function bar() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

    console.log([x, y]);
    return [x, y];
}
bar();

function func(arg) {}
// let不允许在相同作用域内重复声明同一个变量
// let arg; //报错


//用来计数的循环变量泄露为全局变量
var xxxx = 'hello';
for (var xx = 0; xx < xxxx.length; xx++) {
    console.log(xxxx[xx]);
}
console.log(xx); //xx忽然就成为一个全局变量了

(function () {
    var tmp = 'world;';
})(); //一个立即执行函数表达式IIFE
// console.log(tmp); //报错tmp is not defined

function f() {
    console.log('Im a function outside');
}
(function () {
    if (false) {
        var _f = function _f() {
            console.log('Im a function inside');
        };
        //避免在块级作用域内声明函数

    }
    //可以写成函数表达式
    var f = function f() {
        console.log('7788');
    };
    f();
})();

//const声明一个只读常量不可更改声明时必须赋值 const作用域与let相同
var PI = 3.1415926;
console.log(PI);
// PI = 3.14; //报错 不能再次赋值

var foo = {};
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

var _parsedURL = _slicedToArray(parsedURL, 4),
    protocal = _parsedURL[1],
    fullhost = _parsedURL[2],
    fullpath = _parsedURL[3];

console.log(protocal, fullhost, fullpath);

var myObj = { a: '1', b: '2' };
var a = myObj.a,
    b = myObj.b;

console.log(a, b);

var c, d;
var _c$d = { c: '3', d: '4' };
c = _c$d.c;
d = _c$d.d;

console.log(c, d);
//给新的变量名赋值
var _c$d2 = { c: '3', d: '4' },
    tmp01 = _c$d2.c,
    tmp02 = _c$d2.d;

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

var metatitle = metadata.title,
    _metadata$translation = _slicedToArray(metadata.translations, 1),
    localtitle = _metadata$translation[0].title;

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

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = people[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;
        var _n = _ref.name,
            _p = _ref.family.father;

        console.log('Name:' + _n, 'Father:' + _p);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
