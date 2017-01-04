/**
 * 作者: bullub
 * 日期: 2016/12/12 15:08
 * 用途: 根据数据构造出赫夫曼树，该树用于赫夫曼编码的译码以及生成赫夫曼字典
 */
"use strict";

const HuffmanNode = require("./HuffmanNode");

function sortInsert(arr, huffmanNode) {

    //init insert first node
    if(!arr.length) {
        arr.push(huffmanNode);
        return ;
    }

    //当前元素比栈顶的元素大，则直接push
    if(huffmanNode.weight >= arr[arr.length - 1].weight) {
        arr.push(huffmanNode);
        return ;
    }

    //结束位置和开始位置
    let end = arr.length - 1;
    let start = 0;

    //使用二分法查找元素插入位置
    let comparisonPoint =  Math.floor((end - start) / 2);

    while (true) {
        if(arr[comparisonPoint].weight > huffmanNode.weight) {
            end = comparisonPoint;
        } else if(arr[comparisonPoint].weight < huffmanNode.weight) {
            start = comparisonPoint;
            //当前节点的下一个节点如果比插入的节点的权重大的话，结束查询，表示已经找到合适的插入位置了
            if(arr[comparisonPoint + 1] && arr[comparisonPoint + 1].weight >= huffmanNode.weight) {
                break;
            }
        } else {
            break;
        }
        if(end <= start) {
            break;
        }
        comparisonPoint =  Math.floor((end - start) / 2) + start;
    }

    arr.splice(comparisonPoint, 0, huffmanNode);

    // let outQueue = [stack.pop()];
    //
    //
    // //此处应当优化，使用二分查找，快速找到插入位置(因为stack中的节点本身是有顺序的)
    // //如果当前栈顶的元素的权比插入的节点权值大，则继续出栈
    // while (outQueue[0].weight > huffmanNode.weight) {
    //     if(!stack.length) {
    //         break ;
    //     }
    //     outQueue.unshift(stack.pop());
    // }
    //
    // //这样实现将森林进行从小到大排序
    // stack.push(huffmanNode, ...outQueue);

}

/**
 * 根据已排序的森林构造赫夫曼树
 * @param forest {Array} 已经排序的森林
 */
function buildTree(forest) {
    let pNode = null;

    let lNode = null;

    let rNode = null;

    //如果森林中只剩下一个节点了，那么这个节点就是赫夫曼树的根节点
    while (forest.length > 1) {
        lNode = forest.shift();
        rNode = forest.shift();

        pNode = new HuffmanNode(lNode.weight + rNode.weight, lNode, rNode);
        lNode.parent = rNode.parent = pNode;

        //将生成的森林节点放入排序森林
        sortInsert(forest, pNode);
    }

    //剩下的一个节点，就是整颗赫夫曼树的根节点
    return forest[0];
}

class HuffmanTree {
    constructor(data) {
        // this.treeData = sortedNodes;

        //已排序的森林
        let forest = [];

        for(let i = 0, len = data.length; i < len; i ++) {
            sortInsert(forest, new HuffmanNode(data[i].value, null, null, null, data[i].code));
        }

        this.root = buildTree(forest);
    }
}

module.exports = HuffmanTree;