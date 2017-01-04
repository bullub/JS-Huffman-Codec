/**
 * 作者: bullub
 * 日期: 2017/1/4 11:55
 * 用途:
 */
"use strict";

const HuffmanCodec = require("../src/HuffmanCodec");

//我是中国人，我爱中国

let ht = HuffmanCodec.createTree([
    {value: 2, code: "我"},
    {value: 1, code: "是"},
    {value: 2, code: "中"},
    {value: 2, code: "国"},
    {value: 1, code: "人"},
    {value: 1, code: "，"},
    {value: 1, code: "爱"}
]);

console.log(JSON.stringify(ht.root, null, '\t'));

let dic = HuffmanCodec.buildDictionary(ht);

for(var key in dic.dictionary) {
    console.log(key, "=", dic.dictionary[key].code[0].toString(2), dic.dictionary[key].bits);
}

let encodedBuffer = HuffmanCodec.encode("我是中国人，我爱中国", dic);

//打印赫夫曼编码的 我是中国人我爱中国的二进制表示， 4字节就可以表示了
console.log(encodedBuffer);

console.log(HuffmanCodec.decode(encodedBuffer, ht));

//我是中国人，我爱中国
// 001 11010,01110001,10111101,00111000
//     我  是   中  国  人   ，  我  爱    中  国
//001 110 10,1 111 00 01,0 011 110 1,00 111 00 0