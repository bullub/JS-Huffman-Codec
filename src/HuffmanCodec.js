/**
 * 作者: bullub
 * 日期: 2016/12/12 15:56
 * 用途: 编码和译码时 每个字符
 */
"use strict";
const HuffmanTree = require("./HuffmanTree");
const HuffmanNode = require("./HuffmanNode");
const HuffmanDictionary = require("./HuffmanDictionary");

function appendBuffer(buf1, buf2) {
    let buf = new Uint8Array(buf1.length + buf2.length);
    buf1.copy(buf);
    buf2.copy(buf, buf1.length);
    return buf;
}

class HuffmanCodec {
    /**
     * 根据统计的数据生成一颗赫夫曼树
     * @param data {Array<Object{code:times}>} 用于生成赫夫曼树的数据
     * @returns {HuffmanTree} 根据数据构造的赫夫曼树
     */
    static createTree(data = []) {
        return new HuffmanTree(data);
    }

    /**
     * 根据赫夫曼树构建一个赫夫曼字典，用于赫夫曼的编码过程
     * @param huffmanTree {HuffmanTree} 用于生成字典的赫夫曼树
     * @returns {HuffmanDictionary} 赫夫曼字典
     */
    static buildDictionary(huffmanTree) {
        return new HuffmanDictionary(huffmanTree);
    }

    /**
     * 赫夫曼编码方法
     * @param data {String} 数据
     * @param huffmanDictionary {HuffmanDictionary} 编码依赖的赫夫曼字典
     */
    static encode(data, huffmanDictionary) {

        let buffer = [0];

        //已编码的位,从第3位开始编码，第 0， 1， 2位用于记录最后一个字节有多少位是多余的位
        let encodedBitOffset = 3;

        //已编码的字节
        let encodedBytes = 0;

        //单个字符的赫夫曼编码描述
        let code = null;

        for(let i = 0, len = data.length; i < len; i ++) {
            code = huffmanDictionary.getBits(data[i]);

            //编码的位数小于或等于当前字节剩余的位数，则就在当前字节内进行编码
            if(code.bits <= 8 - encodedBitOffset) {
                let currentByte = buffer[encodedBytes];
                buffer[encodedBytes] = currentByte | code.code[0] >>> encodedBitOffset;
                encodedBitOffset += code.bits;
            } else {
                //当前字节不足够进行编码，则先将当前字节填充满，然后新开一个字节编码余下的位
                let encodedBitOffsetCp = encodedBitOffset;
                let currentByte = buffer[encodedBytes];
                buffer[encodedBytes] = currentByte | code.code[0] >>> encodedBitOffsetCp;

                //将余下的位编码到下一个字节
                encodedBytes ++;
                //将当前字节的编码偏移设置一下
                encodedBitOffset = code.bits - (8 - encodedBitOffsetCp);
                buffer[encodedBytes] = code.code[0] << (encodedBitOffset + 1);
            }
        }

        if(encodedBitOffset !== 8) {
            //有剩余的位,将当前的空余的位数值补到开头的三位
            buffer[0] |= (8 - encodedBitOffset) << 5;
        }


        return new Uint8Array(buffer);
    }

    /**
     * 赫夫曼译码方法
     * @param data {Uint8Array} 单字节单元组成的二进制数组
     * @param huffmanTree {HuffmanTree} 译码依赖的赫夫曼树
     */
    static decode(data, huffmanTree) {

        //拿到赫夫曼树的根节点
        let rootNode = huffmanTree.root;

        //设置当前解析到的树的位置为根节点
        let decodedPositionNode = rootNode;

        //解码后的字符串
        let decodedStr = '';

        //当前译码位置
        let decodedOffset = 3;

        //解码到的字节
        // let decodedBytes = 0;

        //剩余的位数
        let plainBits = data[0] >>> 5;

        for(let i = 0, len = data.length; i < len; i ++) {
            //当前解析的字节
            let currentByte = data[i];
            if(i > 0) {
                decodedOffset = 0;
            }
            for(; decodedOffset < 8; decodedOffset ++) {
                if(i === len - 1 && (8 - decodedOffset) === plainBits) {
                    //解析到了最后一个字节，并且后面的字节是空字节，则停止解析
                    break;
                }
                //如果当前解析的位是1，则走右子树，否则走左子树
                if(currentByte & (1 << (7 - decodedOffset))) {
                    decodedPositionNode = decodedPositionNode.rchild;
                } else {
                    decodedPositionNode = decodedPositionNode.lchild;
                }

                //如果当前节点是叶子节点
                if(decodedPositionNode.isLeafNode()) {

                    //取出字符，并重置节点为根
                    decodedStr += decodedPositionNode.code;
                    decodedPositionNode = rootNode;
                }
            }

        }

        return decodedStr;
    }
}

module.exports = HuffmanCodec;