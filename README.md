# 2048 小程序移植版

> 使用mpvue编写的2048小程序, 仅供交流学习.

## 图片展示

![2048](http://olj.masterjoy.top/joy/2048.png)

## 核心代码

初始化
```
[00][01][02][03]
[10][11][12][13]
[20][21][22][23]
[30][31][32][33]
```
(例)左移
```
假设
索引为 => [00][01][02][03]
对应值 =>  2   2   0   4

1.建立一个栈
2.从左入栈,如果入栈元素为0, 不做任何处理
    否则每入一个栈之前和栈顶元素做对比
        如果和栈顶元素不同,入栈 {number: x, flag: false}
        如果和栈顶元素相同,并且flag==false把当前需要入栈的元素抛弃,把栈顶的元素抛出来,并乘以2,加上flag = true,防止多次累加
3.循环完成一轮之后进行解构赋值
    栈底第一个的值赋值给[00]
    栈底第二个的值赋值给[01]
    栈底第三个的值赋值给[02]
    栈底第四个的值赋值给[03]    
```
```
步骤展示
1. [00] => 2 需要入栈 {number:2, falg: false}
 
|{number:2, falg: false}|
|_______________________|
 
2. [01] => 2  需要入栈 {number:2, falg: false} , 和栈顶对比, 可以合并
 
|{number:2, falg: false}|   
|_______________________|
            ∨
|{number:4, falg: true }|
|_______________________|
 
4. [02] => 0 直接抛弃
 
|{number:4, falg: true }|
|_______________________|
 
5. [03] => 4 需要入栈 {number:2, falg: false}, 和栈顶对比, 虽然数值一样,但是flag=true, 无法合并, 入栈
 
|{number:4, falg: flase}|
|{number:4, falg: true }|
|_______________________|
 
--完成入栈, 进行赋值解构--
[0][0] = 4
[0][1] = 4
[0][2] = 0
[0][3] = 0
```
## 代码实现
```javascript
for (let i = 0; i < 4; i++) {
    var stack = new Stack()  // 利用数组实现的栈结构
    for (let j = 0; j < 4; j++) {
        if (this.pie[i][j].number != 0) {
            const top = stack.getTop()
            if (!top.lock && top.number == this.pie[i][j].number) {
                const current = stack.pop()
                current.number *= 2
                current.lock = true
                stack.push(current)
            } else {
                stack.push({ number: this.pie[i][j].number, lock: false })
            }
        }
    }
    for (let j = 0; j < 4; j++) {
        this.pie[i][j].number = stack.data[j] ? stack.data[j].number : 0
    }
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 协议
> license MIT
