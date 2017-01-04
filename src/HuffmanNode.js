/**
 * 作者: bullub
 * 日期: 2016/12/12 15:08
 * 用途:
 */
"use strict";

class HuffmanNode {

    constructor(weight = 0, lchild = null, rchild = null, parent = null, code = null){
        this.lchild = lchild;
        this.rchild = rchild;
        this.parent = parent;
        this.weight = weight;
        this.code = code;
    }

    /**
     * 判断是否是根节点
     * @returns {boolean} true 是根节点， false 非根节点
     */
    isRootNode() {
        return this.parent === null;
    }

    /**
     * 是否是叶子节点
     * @returns {boolean} true 是叶子节点， false 非叶子节点
     */
    isLeafNode() {
        return this.lchild === null && this.rchild === null;
    }

    /**
     * 方便打印查看结果
     * @returns {{weight: (number|*), lchild: (*|{weight, lchild, rchild, code}|string), rchild: (*|{weight, lchild, rchild, code}|string), code: *}}
     */
    toJSON() {
        return {
            weight: this.weight,
            lchild: this.lchild,
            rchild: this.rchild,
            code: this.code
        };
    }
}

// console.log(new HuffmanNode(null, null, null, 0).toString());

module.exports = HuffmanNode;