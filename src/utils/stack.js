export default class Stack {
    constructor() {
        this.data = []
    }
    push(item) {
        this.data.push(item)
    }
    pop() {
        const temp = this.data[this.data.length - 1]
        this.data.splice(this.data.length - 1, 1)
        return temp
    }
    getTop() {
        return this.data[this.data.length - 1] !== undefined ? this.data[this.data.length - 1] : false
    }
}
