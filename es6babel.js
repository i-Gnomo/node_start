"use strict";

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
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6]();
