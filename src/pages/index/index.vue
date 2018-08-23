<template>
    <div id="page-2048">
        <div class="dialog game-over"
            v-if="gameOver">
            <p>Game Over</p>
            <button class="new-game"
                @click="newGame()">New Game</button>
        </div>
        <div class="dialog game-win"
            v-if="is_winner && show_winner_dialog">
            <div class="text">
                <p>Winner Winner</p>
                <p>Chicken Dinne</p>
            </div>
            <div class="button-group">
                <button class="new-game"
                    @click="show_winner_dialog = false">Keep Goin</button>
                <button class="new-game"
                    @click="newGame()">New Game</button>
            </div>
        </div>
        <div class="header">
            <div class="title">2048</div>
            <div class="score-box">
                <p class="tips">当前分</p>
                <p class="number">{{current_score}}</p>
                <p class="add-number"
                    :class="[addTigger]">+{{add}}</p>
            </div>
            <div class="score-box">
                <p class="tips">最高分</p>
                <p class="number">{{max_score}}</p>
            </div>
        </div>
        <div class="info">
            <div class="text">Play 2048 Game Online Join the numbers and get to the 2048 tile!</div>
            <button class="new-game"
                @click="newGame()">New Game</button>
        </div>
        <div class="game-area"
            v-if="is_init"
            @touchstart="touchStart($event)"
            @touchmove="touchMove($event)"
            @touchend="touchEnd($event)"
            ref="game">
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[0][0].number, pie[0][0].zoom, pie[0][0].zoomNew, pie[0][0].showNew]"
                    v-if="pie[0][0].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[0][0].number}"
                        :class="'size-' + pie[0][0].number">{{pie[0][0].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[0][0].oldNumber > 0"
                    :class="['color-'+ pie[0][0].oldNumber, pie[0][0].move, pie[0][0].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[0][0].oldNumber}"
                        :class="'size-' + pie[0][0].oldNumber">{{pie[0][0].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[0][1].number, pie[0][1].zoom, pie[0][1].zoomNew, pie[0][1].showNew]"
                    v-if="pie[0][1].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[0][1].number}"
                        :class="'size-' + pie[0][1].number">{{pie[0][1].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[0][1].oldNumber > 0"
                    :class="['color-'+ pie[0][1].oldNumber, pie[0][1].move, pie[0][1].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[0][1].oldNumber}"
                        :class="'size-' + pie[0][1].oldNumber">{{pie[0][1].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[0][2].number, pie[0][2].zoom, pie[0][2].zoomNew, pie[0][2].showNew]"
                    v-if="pie[0][2].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[0][2].number}"
                        :class="'size-' + pie[0][2].number">{{pie[0][2].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[0][2].oldNumber > 0"
                    :class="['color-'+ pie[0][2].oldNumber, pie[0][2].move, pie[0][2].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[0][2].oldNumber}"
                        :class="'size-' + pie[0][2].oldNumber">{{pie[0][2].oldNumber}}</div>
                </div>
            </div>
            <div class="pie no-right-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[0][3].number, pie[0][3].zoom, pie[0][3].zoomNew, pie[0][3].showNew]"
                    v-if="pie[0][3].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[0][3].number}"
                        :class="'size-' + pie[0][3].number">{{pie[0][3].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[0][3].oldNumber > 0"
                    :class="['color-'+ pie[0][3].oldNumber, pie[0][3].move, pie[0][3].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[0][3].oldNumber}"
                        :class="'size-' + pie[0][3].oldNumber">{{pie[0][3].oldNumber}}</div>
                </div>
            </div>

            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[1][0].number, pie[1][0].zoom, pie[1][0].zoomNew, pie[1][0].showNew]"
                    v-if="pie[1][0].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[1][0].number}"
                        :class="'size-' + pie[1][0].number">{{pie[1][0].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[1][0].oldNumber > 0"
                    :class="['color-'+ pie[1][0].oldNumber, pie[1][0].move, pie[1][0].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[1][0].oldNumber}"
                        :class="'size-' + pie[1][0].oldNumber">{{pie[1][0].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[1][1].number, pie[1][1].zoom, pie[1][1].zoomNew, pie[1][1].showNew]"
                    v-if="pie[1][1].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[1][1].number}"
                        :class="'size-' + pie[1][1].number">{{pie[1][1].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[1][1].oldNumber > 0"
                    :class="['color-'+ pie[1][1].oldNumber, pie[1][1].move, pie[1][1].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[1][1].oldNumber}"
                        :class="'size-' + pie[1][1].oldNumber">{{pie[1][1].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[1][2].number, pie[1][2].zoom, pie[1][2].zoomNew, pie[1][2].showNew]"
                    v-if="pie[1][2].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[1][2].number}"
                        :class="'size-' + pie[1][2].number">{{pie[1][2].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[1][2].oldNumber > 0"
                    :class="['color-'+ pie[1][2].oldNumber, pie[1][2].move, pie[1][2].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[1][2].oldNumber}"
                        :class="'size-' + pie[1][2].oldNumber">{{pie[1][2].oldNumber}}</div>
                </div>
            </div>
            <div class="pie no-right-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[1][3].number, pie[1][3].zoom, pie[1][3].zoomNew, pie[1][3].showNew]"
                    v-if="pie[1][3].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[1][3].number}"
                        :class="'size-' + pie[1][3].number">{{pie[1][3].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[1][3].oldNumber > 0"
                    :class="['color-'+ pie[1][3].oldNumber, pie[1][3].move, pie[1][3].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[1][3].oldNumber}"
                        :class="'size-' + pie[1][3].oldNumber">{{pie[1][3].oldNumber}}</div>
                </div>
            </div>

            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[2][0].number, pie[2][0].zoom, pie[2][0].zoomNew, pie[2][0].showNew]"
                    v-if="pie[2][0].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[2][0].number}"
                        :class="'size-' + pie[2][0].number">{{pie[2][0].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[2][0].oldNumber > 0"
                    :class="['color-'+ pie[2][0].oldNumber, pie[2][0].move, pie[2][0].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[2][0].oldNumber}"
                        :class="'size-' + pie[2][0].oldNumber">{{pie[2][0].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[2][1].number, pie[2][1].zoom, pie[2][1].zoomNew, pie[2][1].showNew]"
                    v-if="pie[2][1].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[2][1].number}"
                        :class="'size-' + pie[2][1].number">{{pie[2][1].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[2][1].oldNumber > 0"
                    :class="['color-'+ pie[2][1].oldNumber, pie[2][1].move, pie[2][1].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[2][1].oldNumber}"
                        :class="'size-' + pie[2][1].oldNumber">{{pie[2][1].oldNumber}}</div>
                </div>
            </div>
            <div class="pie">
                <div class="pie-number"
                    :class="['color-'+ pie[2][2].number, pie[2][2].zoom, pie[2][2].zoomNew, pie[2][2].showNew]"
                    v-if="pie[2][2].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[2][2].number}"
                        :class="'size-' + pie[2][2].number">{{pie[2][2].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[2][2].oldNumber > 0"
                    :class="['color-'+ pie[2][2].oldNumber, pie[2][2].move, pie[2][2].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[2][2].oldNumber}"
                        :class="'size-' + pie[2][2].oldNumber">{{pie[2][2].oldNumber}}</div>
                </div>
            </div>
            <div class="pie no-right-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[2][3].number, pie[2][3].zoom, pie[2][3].zoomNew, pie[2][3].showNew]"
                    v-if="pie[2][3].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[2][3].number}"
                        :class="'size-' + pie[2][3].number">{{pie[2][3].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[2][3].oldNumber > 0"
                    :class="['color-'+ pie[2][3].oldNumber, pie[2][3].move, pie[2][3].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[2][3].oldNumber}"
                        :class="'size-' + pie[2][3].oldNumber">{{pie[2][3].oldNumber}}</div>
                </div>
            </div>

            <div class="pie  no-bottom-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[3][0].number, pie[3][0].zoom, pie[3][0].zoomNew, pie[3][0].showNew]"
                    v-if="pie[3][0].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[3][0].number}"
                        :class="'size-' + pie[3][0].number">{{pie[3][0].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[3][0].oldNumber > 0"
                    :class="['color-'+ pie[3][0].oldNumber, pie[3][0].move, pie[3][0].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[3][0].oldNumber}"
                        :class="'size-' + pie[3][0].oldNumber">{{pie[3][0].oldNumber}}</div>
                </div>
            </div>
            <div class="pie  no-bottom-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[3][1].number, pie[3][1].zoom, pie[3][1].zoomNew, pie[3][1].showNew]"
                    v-if="pie[3][1].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[3][1].number}"
                        :class="'size-' + pie[3][1].number">{{pie[3][1].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[3][1].oldNumber > 0"
                    :class="['color-'+ pie[3][1].oldNumber, pie[3][1].move, pie[3][1].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[3][1].oldNumber}"
                        :class="'size-' + pie[3][1].oldNumber">{{pie[3][1].oldNumber}}</div>
                </div>
            </div>
            <div class="pie  no-bottom-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[3][2].number, pie[3][2].zoom, pie[3][2].zoomNew, pie[3][2].showNew]"
                    v-if="pie[3][2].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[3][2].number}"
                        :class="'size-' + pie[3][2].number">{{pie[3][2].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[3][2].oldNumber > 0"
                    :class="['color-'+ pie[3][2].oldNumber, pie[3][2].move, pie[3][2].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[3][2].oldNumber}"
                        :class="'size-' + pie[3][2].oldNumber">{{pie[3][2].oldNumber}}</div>
                </div>
            </div>
            <div class="pie no-right-margin no-bottom-margin">
                <div class="pie-number"
                    :class="['color-'+ pie[3][3].number, pie[3][3].zoom, pie[3][3].zoomNew, pie[3][3].showNew]"
                    v-if="pie[3][3].number > 0">
                    <div class="number"
                        :style="{'zIndex': pie[3][3].number}"
                        :class="'size-' + pie[3][3].number">{{pie[3][3].number}}</div>
                </div>
                <div class="pie-number old-number"
                    v-if="pie[3][3].oldNumber > 0"
                    :class="['color-'+ pie[3][3].oldNumber, pie[3][3].move, pie[3][3].showOld]">
                    <div class="number"
                        :style="{'zIndex': pie[3][3].oldNumber}"
                        :class="'size-' + pie[3][3].oldNumber">{{pie[3][3].oldNumber}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Stack from '@/utils/stack'
export default {
    data() {
        return {
            pie: [],
            current_score: 0,
            max_score: 0,
            touch_flag: 0, // 是否可以操作
            touch_x: 0,
            touch_y: 0,
            add: 0,
            add_temp: 0,
            animate1: false,
            is_init: false,
            gameOver: false,
            addTigger: '', // 加分动画
            position: '', // 上下左右的CSS动画
            is_winner: false, // 是否达到2048
            show_winner_dialog: false, //展示胜利弹窗
        }
    },
    onShareAppMessage() {
        return {
            title: "经典2048",
            desc: "我已获得最高分,欢迎挑战!",
            path: "/pages/index/index"
        }
    },
    created() {
        const _this = this
        wx.getStorage({
            key: 'max_score',
            success(res) {
                _this.max_score = res.data
            }
        })
        this._reset()
    },
    mounted() {
        this.$nextTick(() => {
            this._init()
        })
    },
    methods: {
        newGame() {
            this.gameOver = false
            this.is_winner = false
            this.show_winner_dialog = false
            this.current_score = 0
            this._reset()
            this._init()
        },
        // 初始化数据
        _reset() {
            for (let i = 0; i < 4; i++) {
                this.$set(this.pie, i, [])
                for (let j = 0; j < 4; j++) {
                    this.$set(this.pie[i], j, { number: 0, oldNumber: 0, zoom: false, move: '', zoomNew: false, step: 0, showNew: '', showOld: '' })
                }
            }
            this.is_init = true
        },
        // 随机
        _init() {
            do {
                var index1 = Math.round(Math.random() * 3)
                var index2 = Math.round(Math.random() * 3)
                var index3 = Math.round(Math.random() * 3)
                var index4 = Math.round(Math.random() * 3)
            } while (index1 == index3 && index2 == index4)
            this.$set(this.pie[index1][index2], 'number', this._randomNumber())
            this.$set(this.pie[index3][index4], 'number', this._randomNumber())
        },
        // 实际游戏中有很大的几率获取是2, 很小的几率获取4
        _randomNumber() {
            const x = Math.round(Math.random() * 10)
            // 80%几率返回2, 20%几率返回4
            return x > 8 ? 4 : 2
        },
        // 新加一个点
        _makeNewPie() {
            let flag = false
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.pie[i][j].number == 0) {
                        flag = true
                    }
                }
            }
            if (flag) {
                do {
                    var index1 = Math.round(Math.random() * 3)
                    var index2 = Math.round(Math.random() * 3)
                } while (this.pie[index1][index2].number != 0)
                this.pie[index1][index2].number = this._randomNumber()
                this.pie[index1][index2].zoomNew = 'zoom-new'
                this.pie[index1][index2].showNew = 'show'
            }
        },
        // 滑动开始
        touchStart(e) {
            if (this.touch_flag !== 0) {
                return
            }
            this.touch_flag = 1
            this.touch_x = e.touches[0].pageX
            this.touch_y = e.touches[0].pageY
            this.add_temp = 0
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    this.pie[i][j].oldNumber = this.pie[i][j].number
                    this.pie[i][j].showNew = 'hide'
                    this.pie[i][j].showOld = 'show'
                    this.pie[i][j].zoom = ''
                }
            }
        },
        // 滑动进行
        touchMove(e) {
            if (this.touch_flag !== 1) {
                return
            }
            this.touch_flag = 2
            this.position = ''
            const now_x = e.touches[0].pageX
            const now_y = e.touches[0].pageY
            const calc_x = now_x - this.touch_x
            const calc_y = now_y - this.touch_y
            if (Math.abs(calc_x) > Math.abs(calc_y)) {
                if (calc_x < 0) {
                    // 是否可以往左划
                    if (this._canToLeft()) {
                        this.position = 'to-left-'
                    }
                } else {
                    // 是否可以网右划
                    if (this._canToRight()) {
                        this.position = 'to-right-'
                    }
                }
            } else {
                if (calc_y < 0) {
                    // 是否可以网上划
                    if (this._canToTop()) {
                        this.position = 'to-top-'
                    }
                } else {
                    // 是否可以往下划
                    if (this._canToBottom()) {
                        this.position = 'to-bottom-'
                    }
                }
            }
        },
        // 滑动结束
        touchEnd(e) {
            if (this.touch_flag !== 2) {
                return
            }
            this.touch_flag = 3
            this._beforeEnd()  // 处理移动
            this._afterEnd()  // 还原设置
        },
        _beforeEnd() {
            switch (this.position) {
                case 'to-left-':
                    this._moveToLeft()
                    this._makeNewPie()
                    break
                case 'to-right-':
                    this._moveToRight()
                    this._makeNewPie()
                    break
                case 'to-top-':
                    this._moveToTop()
                    this._makeNewPie()
                    break
                case 'to-bottom-':
                    this._moveToBottom()
                    this._makeNewPie()
                    break
                default:
                    break
            }
        },
        _afterEnd() {
            if (this.add_temp != 0) {
                this.add = this.add_temp
                this.addTigger = ' '
                this.add
                const max_score = Math.max(this.current_score, this.max_score)
                if (this.max_score < max_score) {
                    this.max_score = max_score
                    wx.setStorage({
                        key: 'max_score',
                        data: max_score
                    })
                }
                setTimeout(() => {
                    this.addTigger = 'add-animation'
                }, 20)
            }
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.pie[i][j].number == 2048 && !this.is_winner) {
                        this.is_winner = true
                        this.show_winner_dialog = true
                    }
                    if (this.pie[i][j].oldNumber != 0 && this.pie[i][j].step != 0) {
                        this.pie[i][j].move = this.position + this.pie[i][j].step
                    }
                }
            }
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        this.pie[i][j].showNew = 'show'
                        this.pie[i][j].showOld = 'hide'
                        this.pie[i][j].zoomNew = ''
                        this.pie[i][j].zoom = this.pie[i][j].zoom ? 'zoom' : ''
                        this.pie[i][j].move = ''
                        this.pie[i][j].step = 0
                        this.pie[i][j].oldNumber = 0
                    }
                }
                if (this.touch_flag == 3) {
                    this.touch_flag = 0
                }
            }, 100)
            // 横排, 竖排
            this._checkGameOver()
        },
        // 向左
        _moveToLeft() {
            /**
             * [00]  01  02  03
             * [10]  11  12  13
             * [20]  21  22  23
             * [30]  31  32  33
             */
            for (let i = 0; i < 4; i++) {
                // 压栈
                var stack = new Stack()
                let step = 0
                for (let j = 0; j < 4; j++) {
                    if (this.pie[i][j].number != 0) {
                        const top = stack.getTop()
                        if (!top.lock && top.number == this.pie[i][j].number) {
                            step += 1
                            this.pie[i][j].step = step
                            const curr = stack.pop()
                            curr.number *= 2
                            curr.lock = true
                            stack.push(curr)
                            this.current_score += curr.number
                            this.add_temp += curr.number
                        } else {
                            stack.push({ number: this.pie[i][j].number, lock: false, step: step })
                            this.pie[i][j].step = step
                        }
                    } else {
                        step += 1
                    }
                }
                for (let j = 0; j < 4; j++) {
                    this.pie[i][j].number = stack.data[j] ? stack.data[j].number : 0
                    this.pie[i][j].zoom = stack.data[j] && stack.data[j].lock ? 'b-zoom' : ''
                }
            }
        },

        // 向右
        _moveToRight() {
            /**
             * 00  01  02  [03]
             * 10  11  12  [13]
             * 20  21  22  [23]
             * 30  31  32  [33]
             */
            for (let i = 0; i < 4; i++) {
                // 压栈
                var stack = new Stack()
                let step = 0
                for (let j = 3; j >= 0; j--) {
                    if (this.pie[i][j].number != 0) {
                        const top = stack.getTop()
                        if (!top.lock && top.number == this.pie[i][j].number) {
                            step += 1
                            this.pie[i][j].step = step
                            const curr = stack.pop()
                            curr.number *= 2
                            curr.lock = true
                            stack.push(curr)
                            this.current_score += curr.number
                            this.add_temp += curr.number
                        } else {
                            stack.push({ number: this.pie[i][j].number, lock: false })
                            this.pie[i][j].step = step
                        }
                    } else {
                        step += 1
                    }
                }
                for (let j = 0; j < 4; j++) {
                    const index = Math.abs(j - 3)
                    this.pie[i][index].number = stack.data[j] ? stack.data[j].number : 0
                    this.pie[i][index].zoom = stack.data[j] && stack.data[j].lock ? 'b-zoom' : ''
                }
            }
        },
        // 向上
        _moveToTop() {
            /**
             * [00] [01] [02] [03]
             *  10   11   12   13
             *  20   21   22   23
             *  30   31   32   33
             */
            for (let i = 0; i < 4; i++) {
                var stack = new Stack()
                let step = 0
                for (let j = 0; j < 4; j++) {
                    /**
                     * 00
                     * 10
                     * 20
                     * 30
                     */
                    if (this.pie[j][i].number != 0) {
                        const top = stack.getTop()
                        if (!top.lock && top.number == this.pie[j][i].number) {
                            step += 1
                            this.pie[j][i].step = step
                            const curr = stack.pop()
                            curr.number *= 2
                            curr.lock = true
                            stack.push(curr)
                            this.current_score += curr.number
                            this.add_temp += curr.number
                        } else {
                            stack.push({ number: this.pie[j][i].number, lock: false })
                            this.pie[j][i].step = step
                        }
                    } else {
                        step += 1
                    }
                }
                for (let j = 0; j < 4; j++) {
                    this.pie[j][i].number = stack.data[j] ? stack.data[j].number : 0
                    this.pie[j][i].zoom = stack.data[j] && stack.data[j].lock ? 'b-zoom' : ''
                }
            }
        },
        // 向下
        _moveToBottom() {
            /**
             *  00   01   02   03
             *  10   11   12   13
             *  20   21   22   23
             * [30] [31] [32] [33]
             */
            for (let i = 0; i < 4; i++) {
                var stack = new Stack()
                let step = 0
                for (let j = 3; j >= 0; j--) {
                    /**
                     * 30
                     * 20
                     * 10
                     * 00
                     */
                    if (this.pie[j][i].number != 0) {
                        const top = stack.getTop()
                        if (!top.lock && top.number == this.pie[j][i].number) {
                            step += 1
                            this.pie[j][i].step = step
                            const curr = stack.pop()
                            curr.number *= 2
                            curr.lock = true
                            stack.push(curr)
                            this.current_score += curr.number
                            this.add_temp += curr.number
                        } else {
                            stack.push({ number: this.pie[j][i].number, lock: false })
                            this.pie[j][i].step = step
                        }
                    } else {
                        step += 1
                    }
                }
                for (let j = 0; j < 4; j++) {
                    const index = Math.abs(j - 3)
                    this.pie[index][i].number = stack.data[j] ? stack.data[j].number : 0
                    this.pie[index][i].zoom = stack.data[j] && stack.data[j].lock ? 'b-zoom' : ''
                }
            }
        },
        // 是否能向左滑动
        _canToLeft() {
            // 判断能否移动, 判断某个点下面是空的, 或者下面和自己一样的
            /**
             * [00]  01  02  03
             * [10]  11  12  13
             * [20]  21  22  23
             * [30]  31  32  33
             */
            for (let i = 0; i < 4; i++) {
                /**
                 * 00
                 * 01
                 * 02
                 * 03
                 */
                var stack = new Stack()
                for (let j = 0; j < 4; j++) {
                    const top = stack.getTop()
                    if (top !== false) {
                        if (this.pie[i][j].number != 0) {
                            if (top == 0) {
                                return true
                            }
                            if (top == this.pie[i][j].number) {
                                return true
                            }
                        }
                    }
                    stack.push(this.pie[i][j].number)
                }
            }
            return false
        },
        // 是否能向右滑动
        _canToRight() {
            /**
             * 00  01  02  [03]
             * 10  11  12  [13]
             * 20  21  22  [23]
             * 30  31  32  [33]
             */
            for (let i = 0; i < 4; i++) {
                /**
                 * 03
                 * 02
                 * 01
                 * 00
                 */
                var stack = new Stack()
                for (let j = 3; j >= 0; j--) {
                    const top = stack.getTop()
                    if (top !== false) {
                        if (this.pie[i][j].number != 0) {
                            if (top == 0) {
                                return true
                            }
                            if (top == this.pie[i][j].number) {
                                return true
                            }
                        }
                    }
                    stack.push(this.pie[i][j].number)
                }
            }
            return false
        },
        // 是否能向上滑动
        _canToTop() {
            /**
             * [00] [01] [02] [03]
             *  10   11   12   13
             *  20   21   22   23
             *  30   31   32   33
             */
            for (let i = 0; i < 4; i++) {
                /**
                 * 00
                 * 10
                 * 20
                 * 30
                 */
                var stack = new Stack()
                for (let j = 0; j < 4; j++) {
                    const top = stack.getTop()
                    if (top !== false) {
                        if (this.pie[j][i].number != 0) {
                            if (top == 0) {
                                return true
                            }
                            if (top == this.pie[j][i].number) {
                                return true
                            }
                        }
                    }
                    stack.push(this.pie[j][i].number)
                }
            }
            return false
        },
        // 是否能向下滑动
        _canToBottom() {
            /**
             *  00   01   02   03
             *  10   11   12   13
             *  20   21   22   23
             * [30] [31] [32] [33]
             */
            for (let i = 0; i < 4; i++) {
                /**
                 * 00
                 * 10
                 * 20
                 * 30
                 */
                var stack = new Stack()
                for (let j = 3; j >= 0; j--) {
                    const top = stack.getTop()
                    if (top !== false) {
                        if (this.pie[j][i].number != 0) {
                            if (top == 0) {
                                return true
                            }
                            if (top == this.pie[j][i].number) {
                                return true
                            }
                        }
                    }
                    stack.push(this.pie[j][i].number)
                }
            }
            return false
        },
        // 检测游戏是否结束
        _checkGameOver() {
            /**
             *  00   01   02   03
             *  10   11   12   13
             *  20   21   22   23
             *  30   31   32   33
             */
            for (let i = 0; i < 4; i++) {
                var stack1 = new Stack()
                var stack2 = new Stack()
                for (let j = 0; j < 4; j++) {
                    if (this.pie[i][j].number == 0) {
                        return
                    }
                    var top1 = stack1.getTop()
                    var top2 = stack2.getTop()
                    if (top1 == this.pie[i][j].number) {
                        return
                    } else {
                        stack1.push(this.pie[i][j].number)
                    }
                    if (top2 == this.pie[j][i].number) {
                        return
                    } else {
                        stack2.push(this.pie[j][i].number)
                    }
                    /**
                     * i j | j i
                     * 0 0 | 0 0
                     * 0 1 | 1 0
                     * 0 2 | 2 0
                     * 0 3 | 3 0
                     */
                }
            }
            this.gameOver = true
        },
    },
}
</script>

<style lang="less">
page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #page-2048 {
        height: 100%;
        background-color: #faf8ef;
        padding: 20px 50px;
        .header {
            display: flex;
            align-items: center;
            .title {
                flex: 1;
                color: #776;
                font-size: 25px;
                font-weight: bold;
            }
            .score-box {
                flex: 1;
                position: relative;
                background-color: #bbada0;
                padding: 10px;
                margin: 5px;
                border-radius: 3px;
                text-align: center;
                .tips {
                    font-size: 15px;
                    color: #eee1c9;
                }
                .number {
                    font-size: 20px;
                    color: #fff;
                }
                .add-number {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 10px;
                    font-size: 20px;
                    opacity: 0;
                    color: #000;
                }
                .add-animation {
                    animation: add-disappear 2s linear;
                    animation-fill-mode: forwards;
                }
            }
        }
        .info {
            margin-top: 30px;
            display: flex;
            .text {
                width: 60%;
                color: #776;
                font-size: 15px;
            }
            .new-game {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40%;
                line-height: 1.2;
                color: #faf8ef;
                font-weight: bold;
                background-color: #bbada0;
            }
        }
        .game-area {
            background-color: #bbada0;
            border-radius: 3px;
            padding: 10px;
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            .pie {
                position: relative;
                width: 24%;
                margin-right: 1.333333%;
                margin-bottom: 1.333333%;
                padding-bottom: 24%;
                border-radius: 3px;
                background-color: #cdc1b4;
                .pie-number {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 1;
                    border-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .number {
                        font-weight: bold;
                        text-align: center;
                        color: #faf8ef;
                    }
                    .size-2 {
                        font-size: 30px;
                    }
                    .size-4 {
                        font-size: 30px;
                    }
                    .size-8 {
                        font-size: 30px;
                    }
                    .size-16 {
                        font-size: 30px;
                    }
                    .size-32 {
                        font-size: 30px;
                    }
                    .size-64 {
                        font-size: 30px;
                    }
                    .size-128 {
                        font-size: 25px;
                    }
                    .size-256 {
                        font-size: 25px;
                    }
                    .size-512 {
                        font-size: 25px;
                    }
                    .size-1024 {
                        font-size: 20px;
                    }
                    .size-2048 {
                        font-size: 20px;
                    }
                    .size-4096 {
                        font-size: 20px;
                    }
                    .size-8192 {
                        font-size: 20px;
                    }
                    .size-16384 {
                        font-size: 15px;
                    }
                    .size-32768 {
                        font-size: 15px;
                    }
                    .size-65536 {
                        font-size: 15px;
                    }
                }
                .show {
                }
                .hide {
                    visibility: hidden;
                }
                .color-2 {
                    background: #eee4da;
                }
                .color-4 {
                    background: #ede0c8;
                }
                .color-8 {
                    background: #f2b179;
                }
                .color-16 {
                    background: #f59563;
                }
                .color-32 {
                    background: #f67c5f;
                }
                .color-64 {
                    background: #f65e3b;
                }
                .color-128 {
                    background: #f5d36f;
                }
                .color-256 {
                    background: #f3cc33;
                }
                .color-512 {
                    background: #f2c722;
                }
                .color-1024 {
                    background: #f8cc1d;
                }
                .color-2048 {
                    background: #facd19;
                }
                .color-4096 {
                    background: #35f17d;
                }
                .color-8192 {
                    background: #2ef379;
                }
                .color-16384 {
                    background: #2df078;
                }
                .color-32768 {
                    background: #2af778;
                }
                .color-65536 {
                    background: #23f574;
                }
            }
            .no-right-margin {
                margin-right: 0;
            }
            .no-bottom-margin {
                margin-bottom: 0;
            }
        }
        .to-left-1 {
            transition: all 0.1s;
            transform: translateX(-105.333333%);
        }
        .to-left-2 {
            transition: all 0.1s;
            transform: translateX(-210.666666%);
        }
        .to-left-3 {
            transition: all 0.1s;
            transform: translateX(-316%);
        }
        .to-right-1 {
            transition: all 0.1s;
            transform: translateX(105.333333%);
        }
        .to-right-2 {
            transition: all 0.1s;
            transform: translateX(210.666666%);
        }
        .to-right-3 {
            transition: all 0.1s;
            transform: translateX(316%);
        }
        .to-top-1 {
            transition: all 0.1s;
            transform: translateY(-105.333333%);
        }
        .to-top-2 {
            transition: all 0.1s;
            transform: translateY(-210.666666%);
        }
        .to-top-3 {
            transition: all 0.1s;
            transform: translateY(-316%);
        }
        .to-bottom-1 {
            transition: all 0.1s;
            transform: translateY(105.333333%);
        }
        .to-bottom-2 {
            transition: all 0.1s;
            transform: translateY(210.666666%);
        }
        .to-bottom-3 {
            transition: all 0.1s;
            transform: translateY(316%);
        }
        .zoom {
            animation: zoom-active 0.1s linear;
        }
        .zoom-new {
            animation: zoom-new 0.1s linear;
        }
        .dialog {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: #f5f5f5;
            opacity: 0.8;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .game-over {
            p {
                margin-bottom: 30px;
                font-size: 40px;
                color: #f59563;
            }
            .new-game {
                line-height: 1.2;
                color: #faf8ef;
                font-weight: bold;
                height: 40px;
                display: flex;
                align-items: center;
                background-color: #bbada0;
            }
        }
        .game-win {
            .text {
                margin-bottom: 30px;
                font-size: 40px;
                color: #f59563;
                text-align: center;
            }
            .button-group {
                display: flex;
                .new-game + .new-game {
                    margin-left: 5px;
                }
                .new-game {
                    line-height: 1.2;
                    color: #faf8ef;
                    font-weight: bold;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    background-color: #bbada0;
                }
            }
        }
    }
}
@keyframes zoom-active {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes zoom-new {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes add-disappear {
    0% {
        opacity: 0;
        color: #000;
    }
    1% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        color: #fff;
        opacity: 0;
        transform: translateY(-200%);
    }
}
@keyframes show-pie {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes hidden-pie {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
