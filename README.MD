# JS-Huffman-Codec
A Huffman coding standard and codec implementation.

Get Start  

```javascript 1.8

//通过一个数组，code表示字符，value表示字频
//Use an array of code represent a character value word frequency.
let ht = HuffmanCodec.createTree([
    {value: 2, code: "我"},
    {value: 1, code: "是"},
    {value: 2, code: "中"},
    {value: 2, code: "国"},
    {value: 1, code: "人"},
    {value: 1, code: "，"},
    {value: 1, code: "爱"}
]);

//打印生成的赫夫曼树
//Print hefuman tree.
console.log(JSON.stringify(ht.root, null, '\t'));

//根据赫夫曼树，生成字典
//According to Huffman tree generated dictionary.
let dic = HuffmanCodec.buildDictionary(ht);

//打印字典内容
//Print the content of dictionary.
for(var key in dic.dictionary) {
    console.log(key, "=", dic.dictionary[key].code[0].toString(2), dic.dictionary[key].bits + "bits");
}

//根据字典，编码一个字符串
//Encoding a string according to the dictionary.
let encodedBuffer = HuffmanCodec.encode("我是中国人，我爱中国", dic);

//打印赫夫曼编码的 "我是中国人我爱中国" 的二进制表示， 4字节: [ 58, 241, 61, 56 ]
//Print of Huffman coding "我是中国人我爱中国" binary representation of 4 bytes: [58, 241, 61, 56]
console.log(encodedBuffer);

//打印根据4个字节和赫夫曼树进行译码的字符串结果——我是中国人，我爱中国
//Prints according to the 4 bytes and decoding of Huffman tree string result--我是中国人，我爱中国
console.log(HuffmanCodec.decode(encodedBuffer, ht));

```
