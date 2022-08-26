/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/animation.ts":
/*!**********************************!*\
  !*** ./src/classes/animation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Animation = void 0;
class Animation {
    removeAnimationProperty(sprite) {
        sprite.classList.remove('animation');
    }
    addAnimationProperty(sprite) {
        sprite.classList.add('animation');
    }
    runAnimation(sprite) {
        sprite.style.animationPlayState = 'running';
    }
    pauseAnimation(sprite) {
        sprite.style.animationPlayState = 'paused';
    }
}
exports.Animation = Animation;


/***/ }),

/***/ "./src/classes/game.ts":
/*!*****************************!*\
  !*** ./src/classes/game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
class Game {
    constructor(mario, pipe, _scoreGame, gameTimer) {
        this.mario = mario;
        this.pipe = pipe;
        this._scoreGame = _scoreGame;
        this.gameTimer = gameTimer;
        this._points = 0;
        this._gameTimestamp = 0;
        this._menu = null;
        this._topScore = this.getTopScoreFromBrowser();
    }
    get points() {
        return this._points;
    }
    set points(points) {
        this._points = points - this._gameTimestamp;
    }
    get topScore() {
        return this._topScore;
    }
    set topScore(topScore) {
        this.topScore = topScore;
    }
    set menu(menu) {
        this._menu = menu;
    }
    getMenu() {
        if (this._menu !== null)
            return this._menu;
    }
    startTimestamp() {
        this._gameTimestamp = +new Date();
    }
    hiddenGameScore() {
        this._scoreGame.style.display = 'none';
    }
    showGameScore() {
        this._scoreGame.style.display = 'block';
    }
    updateGameScore() {
        this.points = +new Date();
        this._scoreGame.textContent = `Score: ${this.points}`;
    }
    getTopScoreFromBrowser() {
        var _a;
        return (_a = localStorage['mario_top_score']) !== null && _a !== void 0 ? _a : 0;
    }
    updateTopScore() {
        localStorage['mario_top_score'] = this.topScore;
    }
    compareNewScoreWithTopScore() {
        if (!this.isNewScoreBetter())
            return;
        this._topScore = this.points;
        this.updateTopScore();
    }
    isNewScoreBetter() {
        return this.points > this.topScore;
    }
    resetSpriteStatement() {
        this.pipe.resetPipe();
        this.mario.resetMario();
    }
    startGame() {
        this.showGameScore();
        this.pipe.addPropertyAnimation();
        this.pipe.runPipeAnimation();
        this.startTimestamp();
        this.gameTimer.setTimer(this, 'verifyMarioDanger', 15);
    }
    stopGame() {
        var _a;
        this.stopIntervals();
        this.stopSpritesAnimation();
        this.mario.changeMarioSpriteImage('./assets/images/game-over.png');
        this.compareNewScoreWithTopScore();
        (_a = this._menu) === null || _a === void 0 ? void 0 : _a.gameFinished();
    }
    stopIntervals() {
        this.gameTimer.clearTimer();
        this.mario.stopMarioInterval();
    }
    stopSpritesAnimation() {
        this.mario.pauseMarioAnimation();
        this.pipe.pausePipeAnimation();
    }
    verifyMarioDanger() {
        this.updateGameScore();
        const marioPosition = this.mario.getMarioPosition();
        const pipePosition = this.pipe.getPipePosition();
        if (!this.isMarioOnDanger(marioPosition, pipePosition))
            return;
        if (!this.isPipeUnderMario(marioPosition, pipePosition))
            return;
        this.stopGame();
    }
    isMarioOnDanger(marioPosition, pipePosition) {
        return marioPosition.bottom >= pipePosition.top;
    }
    isPipeUnderMario(marioPosition, pipePosition) {
        return (pipePosition.left <= marioPosition.right &&
            pipePosition.right >= (marioPosition.right + marioPosition.left) / 2);
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/classes/mario.ts":
/*!******************************!*\
  !*** ./src/classes/mario.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mario = void 0;
class Mario {
    constructor(_marioSprite, animation, marioJumpTimer) {
        this._marioSprite = _marioSprite;
        this.animation = animation;
        this.marioJumpTimer = marioJumpTimer;
        document.addEventListener('keydown', this.jumpController.bind(this));
    }
    get marioSprite() {
        return this._marioSprite;
    }
    jumpController(event) {
        if (event.key !== ' ' && event.key !== 'ArrowUp')
            return;
        if (this.marioContainsJump())
            return;
        this.addMarioJump();
    }
    addMarioJump() {
        this.marioJumpTimer.setTimer(this, 'removeMarioJump', 900);
        this.animation.addAnimationProperty(this.marioSprite);
    }
    removeMarioJump() {
        this.animation.removeAnimationProperty(this.marioSprite);
    }
    runMarioAnimation() {
        this.animation.runAnimation(this.marioSprite);
    }
    pauseMarioAnimation() {
        this.animation.pauseAnimation(this.marioSprite);
    }
    changeMarioSpriteImage(imageSrc) {
        this._marioSprite.src = imageSrc;
    }
    marioContainsJump() {
        return this.marioSprite.classList.contains('animation');
    }
    resetMario() {
        this.removeMarioJump();
        this.changeMarioSpriteImage('./assets/images/mario_gif_cortado.gif');
        this.runMarioAnimation();
    }
    getMarioPosition() {
        return this.marioSprite.getBoundingClientRect();
    }
    stopMarioInterval() {
        this.marioJumpTimer.clearTimer();
    }
}
exports.Mario = Mario;


/***/ }),

/***/ "./src/classes/menu.ts":
/*!*****************************!*\
  !*** ./src/classes/menu.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Menu = void 0;
class Menu {
    constructor(_playButton, _scoreP, _topScoreP, game, startTimer) {
        this._playButton = _playButton;
        this._scoreP = _scoreP;
        this._topScoreP = _topScoreP;
        this.game = game;
        this.startTimer = startTimer;
        this._playButtonDiv = this._playButton.parentElement;
        this._playButton.addEventListener('click', this.playButtonPressed.bind(this));
    }
    hiddenMenu() {
        this._playButtonDiv.style.display = 'none';
    }
    showMenu() {
        this._playButtonDiv.style.display = 'flex';
    }
    showMenuScore() {
        this._scoreP.style.display = 'block';
    }
    playButtonPressed() {
        this.hiddenMenu();
        this.game.resetSpriteStatement();
        this.startTimer.setTimer(this.game, 'startGame', 10);
    }
    gameFinished() {
        this.showMenu();
        this.setScore();
        this.setTopScore();
        this.showMenuScore();
    }
    setTopScore() {
        this._topScoreP.textContent = `Top Score: ${this.game.topScore}`;
    }
    setScore() {
        this._scoreP.textContent = `Score: ${this.game.points}`;
    }
}
exports.Menu = Menu;


/***/ }),

/***/ "./src/classes/pipe.ts":
/*!*****************************!*\
  !*** ./src/classes/pipe.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pipe = void 0;
class Pipe {
    constructor(_pipeSprite, animation) {
        this._pipeSprite = _pipeSprite;
        this.animation = animation;
    }
    stopPipeAnimation() {
        throw new Error('Method not implemented.');
    }
    get pipeSprite() {
        return this._pipeSprite;
    }
    resetPipe() {
        this.animation.removeAnimationProperty(this.pipeSprite);
    }
    addPropertyAnimation() {
        this.animation.addAnimationProperty(this.pipeSprite);
    }
    runPipeAnimation() {
        this.animation.runAnimation(this.pipeSprite);
    }
    pausePipeAnimation() {
        this.animation.pauseAnimation(this.pipeSprite);
    }
    getPipePosition() {
        return this.pipeSprite.getBoundingClientRect();
    }
}
exports.Pipe = Pipe;


/***/ }),

/***/ "./src/classes/timer.ts":
/*!******************************!*\
  !*** ./src/classes/timer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimerTimeout = exports.TimerInterval = void 0;
class TimerInterval {
    constructor() {
        this._timer = null;
    }
    setTimer(obj, objMethod, milliseconds) {
        this._timer = setInterval(() => {
            obj[objMethod]();
        }, milliseconds);
    }
    clearTimer() {
        if (this._timer)
            clearInterval(this._timer);
    }
}
exports.TimerInterval = TimerInterval;
class TimerTimeout {
    constructor() {
        this._timer = null;
    }
    setTimer(obj, objMethod, milliseconds) {
        this._timer = setTimeout(() => {
            obj[objMethod]();
        }, milliseconds);
    }
    clearTimer() {
        if (this._timer)
            clearTimeout(this._timer);
    }
}
exports.TimerTimeout = TimerTimeout;


/***/ }),

/***/ "./src/services/htmlHud.ts":
/*!*********************************!*\
  !*** ./src/services/htmlHud.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.topScoreP = exports.scoreP = exports.playButton = exports.scoreGame = void 0;
exports.scoreGame = document.querySelector('.score');
exports.playButton = document.querySelector('.start');
exports.scoreP = document.querySelector('.game-menu__p');
exports.topScoreP = document.querySelector('.game-menu__p-top-score');


/***/ }),

/***/ "./src/services/htmlSprites.ts":
/*!*************************************!*\
  !*** ./src/services/htmlSprites.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloudsSprite = exports.pipeSprite = exports.marioSprite = void 0;
exports.marioSprite = document.querySelector('.mario');
exports.pipeSprite = document.querySelector('.pipe');
exports.cloudsSprite = document.querySelector('.clouds');


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const game_1 = __webpack_require__(/*! ./classes/game */ "./src/classes/game.ts");
const menu_1 = __webpack_require__(/*! ./classes/menu */ "./src/classes/menu.ts");
const mario_1 = __webpack_require__(/*! ./classes/mario */ "./src/classes/mario.ts");
const pipe_1 = __webpack_require__(/*! ./classes/pipe */ "./src/classes/pipe.ts");
const animation_1 = __webpack_require__(/*! ./classes/animation */ "./src/classes/animation.ts");
const timer_1 = __webpack_require__(/*! ./classes/timer */ "./src/classes/timer.ts");
const htmlSprites_1 = __webpack_require__(/*! ./services/htmlSprites */ "./src/services/htmlSprites.ts");
const htmlHud_1 = __webpack_require__(/*! ./services/htmlHud */ "./src/services/htmlHud.ts");
const animation = new animation_1.Animation();
const startGameTimer = new timer_1.TimerTimeout();
const marioJumpTimer = new timer_1.TimerTimeout();
const gameTimer = new timer_1.TimerInterval();
const mario = new mario_1.Mario(htmlSprites_1.marioSprite, animation, marioJumpTimer);
const pipe = new pipe_1.Pipe(htmlSprites_1.pipeSprite, animation);
const game = new game_1.Game(mario, pipe, htmlHud_1.scoreGame, gameTimer);
const menu = new menu_1.Menu(htmlHud_1.playButton, htmlHud_1.scoreP, htmlHud_1.topScoreP, game, startGameTimer);
menu.setTopScore();
game.menu = menu;

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map