/**
 * 作者: bullub
 * 日期: 2016/12/13 14:07
 * 用途: 赫夫曼字典，用于赫夫曼编码时，直接查字典进行编码
 */
"use strict";

/**
 * 根据赫夫曼树构造一个编码字典
 * @param huffmanTree {HuffmanTree} 赫夫曼书对象
 * @returns {Object} 一个字典hash表
 */
function buildDictionary(huffmanTree) {

    let node = null;

    let dic = {};

    let stack = [huffmanTree.root];

    while (stack.length) {
        node = stack.pop();

        if(node.rchild) {
            stack.push(node.rchild);
        }

        if(node.lchild) {
            stack.push(node.lchild);
        }

        //如果是叶子节点则放入字典
        if(node.isLeafNode()) {
            dic[node.code] = getCode(node);
        }

    }

    return dic;
}

/**
 * 拿到单个叶子节点对应的编码
 * @param node {HuffmanNode} 叶子节点对象
 * @returns {{code: Uint8Array, bits: number}} 一个字符对应的编码描述，包括二进制数组和当前字符所需要是位数
 */
function getCode(node) {

    let code = [0];
    //层级
    let bits = 0;
    //当前的字节数
    let byteNum = 0;
    //当前的位数(字节中的位数)
    let bitNum = 0;
    while (!node.isRootNode()) {

        if(node.parent.lchild === node) {
            //父节点的左孩子，记0
            code[byteNum] >>>= 1;
        } else {
            //父节点的右孩子，记1
            code[byteNum] = (code[byteNum] >>> 1) | 0x80;
        }

        bits ++;
        bitNum ++;

        if(bitNum > 7) {
            bitNum = 0;
            byteNum ++;
            code[byteNum] = 0;
        }

        node = node.parent;
    }
    return {
        code: new Uint8Array(code),
        bits
    }
}

class HuffmanDictionary {

    constructor(huffmanTree) {
        this.dictionary = buildDictionary(huffmanTree);
    }

    /**
     * 根据字符获取字符的编码描述
     * @param char {String} 单个字符
     * @returns {Object} 当字符的编码描述对象
     */
    getBits(char) {
        return this.dictionary[char];
    }
}

module.exports = HuffmanDictionary;