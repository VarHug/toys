// 基础类型
// 布尔值
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
// 多行字符串
let str1: string = `aaa
bbb
ccc`;
// 字符串模版
let hello: string = 'hello world';
let helloFun = function (str: string) {
  return `hello ${str}`;
}

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 元组
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello']; 报错

// 枚举
enum Color { Red = 1, Green, Blue };
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;

// void
function logSomething(): void {
  console.log('this is something');
}
// void类型只能声明变量null和undefined
let unusable: void = undefined;

// null和undefined
// 当指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined;
let n: null = null;
let strnull1: string = null;

// 类型断言
let someValue1: any = 'this is a string';
let strLength1: number = (<string>someValue1).length;
let someValue2: any = 'this is also a string';
let strLength2: number = (someValue2 as string).length;
