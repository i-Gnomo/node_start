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

function func(arg) {
    // let arg; //报错
}