// 修饰符
// g:全局搜索
// i:忽略大小写
// m:多行搜索
var reg1 = /\bis\b/g;
var str1 = 'He is a boy.This is a dog.Where is she?';
str1.replace(reg1, 'IS');

var reg2 = new RegExp('\\bis\\b', 'g');

// 元字符
// []类中的一个
var reg3 = /[abc]/g;
var str3 = 'a1b2c3d4';
str3.replace(reg3, 'x');// 'x1x2x3d4';
// ^创建反向类
var reg4 = /[^abc]/g;
var str4 = 'a1b2c3d4';
str4.replace(reg4, 'x');// "axbxcxxx";
// 范围类
// [a-z]
'a1b2d3z4x9'.replace(/[a-z]/g, 'Q'); // "Q1Q2Q3Q4Q9"
// [a-zA-Z]
'a1b2d3z4x9SDSAFSA'.replace(/[a-zA-Z]/g, 'X'); // "X1X2X3X4X9XXXXXXX"
'a1b2d3z4x9SDSAFSA'.replace(/[a-z]/gi, 'X'); // "X1X2X3X4X9XXXXXXX"

// 预定义类
// . === [^\r\n] 除了回车符和换行符之外的所有字符
// \d === [0-9] 数字字符
// \D === [^0-9] 非数字字符
// \s === [\t\n\x0B\f\r] 空白符
// \S === [^\t\n\x0B\f\r] 非空白符
// \w === [a-zA-Z_0-9] 单词字符（字母、数字、下划线）
// \W === [^a-zA-Z_0-9] 非单词字符

// 边界
// ^ 以xxxx开始
// $ 以xxxx结束
// \b 单词边界
// \B 非单词边界

// 量词
// ? 出现零次或一次（最多出现一次）
// + 出现一次或多次（至少出现一次）
// * 出现零次或多次（任意次）
// {n} 出现n次
// {n, m} 出现n到m次
// {n,} 至少出现n次

// 贪婪模式
'12345678'.replace(/\d{3,6}/g, 'X'); // 'X78'
// 非贪婪模式，在量词后加上？
'123456789'.match(/\d{3,5}?/g); // ['123', '456', '789']

// 分组
// ()达到分组的效果，使量词作用于分组
'a1b2c3d4'.match(/([a-z]\d){3}/g); // ['a1b2c3']
// 或
// |
'ByronCasper'.match(/Byron|Casper/g);
'ByronsperByrCasper'.match(/Byr(on|Ca)sper/g); // ["Byronsper", "ByrCasper"]
// 反向引用
'2015-12-25'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$1/$3'); // "12/2015/25"
// 忽略分组
// 不想捕获某些分组，只需在分组内加上？：就可以

// 前瞻
// 正向前瞻exp(?=assert)
// 负向前瞻exp(?!assert)
'a2*3'.replace(/\w(?=\d)/g, 'X'); // "X2*3"
'a2*34vv'.replace(/\w(?=\d)/g, 'X'); // "X2*X4vv"
'a2*34vv'.replace(/\w(?!\d)/g, 'X'); // "aX*3XXX"

// 对象属性
var regtest = /\w/;
regtest.global; // false
regtest.multiline; // false
regtest.ignoreCase; // false;
regtest.source; // "\w"

// 正则表达式方法
// test
regtest.test('w'); // true
var regtest2 = /\w/g;
while (regtest2.test('ab')) {
  console.log(regtest2.lastIndex);
} // 1 2
// exec
var regexp1 = /\d(\w)\d/;
var regexp2 = /\d(\w)\d/g;
var ts = '1a2b3c4d5e';
var ret = regexp1.exec(ts);
console.log(regexp1.lastIndex + '\t' + ret.index + '\t' + ret.toString());
// 0	0	1a2,a
console.log(regexp1.lastIndex + '\t' + ret.index + '\t' + ret.toString());
// 0	0	1a2,a
// ret:["1a2", "a", index: 0, input: "1a2b3c4d5e"]

while (ret = regexp2.exec(ts)) {
  console.log(regexp2.lastIndex + '\t' + ret.index + '\t' + ret.toString());
}

// 字符串方法
'a1b2c3d4'.search(/\w/); // 0
var r1 = /\d(\w)\w/;
var r2 = /\d(\w)\w/g;
var ts = '$1a2b3c4d5e';

var ret = ts.match(r1);
console.log(ret); // ["1a2", "a", index: 1, input: "$1a2b3c4d5e"]
console.log(ret.index + '\t' + r1.lastIndex); // 1	0

var ret = ts.match(r2);
console.log(ret); // ["1a2", "3c4"]
console.log(ret.index + '\t' + r2.lastIndex); // undefined	0

'a1b2c3d4e'.split(/\d/g); // ["a", "b", "c", "d", "e"]

'a1b2c3d4e5'.replace(/\d/g, function (match, index, origin) {
  console.log(index);
  return parseInt(match) + 1;
}); // "a2b3c4d5e6"

'a1b2c3d4e5'.replace(/(\d)(\w)(\d)/g, function (match, gruop1, gruop2, gruop3, index, origin) {
  console.log(match);
  return gruop1 + gruop2;
}); // "a1bc3de5"
