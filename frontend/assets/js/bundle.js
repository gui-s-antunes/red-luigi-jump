/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animation.ts":
/*!**************************!*\
  !*** ./src/animation.ts ***!
  \**************************/
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

/***/ "./src/clouds.ts":
/*!***********************!*\
  !*** ./src/clouds.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Clouds = void 0;
class Clouds {
    constructor(_clouds) {
        this._clouds = _clouds;
    }
    get clouds() {
        return this._clouds;
    }
}
exports.Clouds = Clouds;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
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

/***/ "./src/listeners.ts":
/*!**************************!*\
  !*** ./src/listeners.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarioJumpListener = void 0;
class MarioJumpListener {
    constructor(_mario) {
        this._mario = _mario;
        document.addEventListener('keydown', this.jumpController.bind(this));
    }
    get mario() {
        return this._mario;
    }
    jumpController(event) {
        if (event.key !== ' ' && event.key !== 'ArrowUp')
            return;
        if (this.mario.marioContainsJump())
            return;
        this.addMarioJumpClass();
    }
    addMarioJumpClass() {
        this.mario.addMarioJump();
    }
}
exports.MarioJumpListener = MarioJumpListener;


/***/ }),

/***/ "./src/mario.ts":
/*!**********************!*\
  !*** ./src/mario.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mario = void 0;
class Mario {
    constructor(_marioSprite, animation, marioJumpTimer) {
        this._marioSprite = _marioSprite;
        this.animation = animation;
        this.marioJumpTimer = marioJumpTimer;
    }
    get marioSprite() {
        return this._marioSprite;
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
        return this.marioSprite.classList.contains('jump');
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

/***/ "./src/menu.ts":
/*!*********************!*\
  !*** ./src/menu.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Menu = void 0;
class Menu {
    constructor(_playButton, _scoreP, _topScoreP, game, mario, pipe, startTimer) {
        this._playButton = _playButton;
        this._scoreP = _scoreP;
        this._topScoreP = _topScoreP;
        this.game = game;
        this.mario = mario;
        this.pipe = pipe;
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
        this.pipe.resetPipe();
        this.mario.resetMario();
        this.hiddenMenu();
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

/***/ "./src/pipe.ts":
/*!*********************!*\
  !*** ./src/pipe.ts ***!
  \*********************/
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

/***/ "./src/timer.ts":
/*!**********************!*\
  !*** ./src/timer.ts ***!
  \**********************/
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
const clouds_1 = __webpack_require__(/*! ./clouds */ "./src/clouds.ts");
const game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
const menu_1 = __webpack_require__(/*! ./menu */ "./src/menu.ts");
const mario_1 = __webpack_require__(/*! ./mario */ "./src/mario.ts");
const pipe_1 = __webpack_require__(/*! ./pipe */ "./src/pipe.ts");
const animation_1 = __webpack_require__(/*! ./animation */ "./src/animation.ts");
const timer_1 = __webpack_require__(/*! ./timer */ "./src/timer.ts");
const listeners_1 = __webpack_require__(/*! ./listeners */ "./src/listeners.ts");
const animation = new animation_1.Animation();
const startGameTimer = new timer_1.TimerTimeout();
const marioJumpTimer = new timer_1.TimerTimeout();
const gameTimer = new timer_1.TimerInterval();
const mario = new mario_1.Mario(document.querySelector('.mario'), animation, marioJumpTimer);
const pipe = new pipe_1.Pipe(document.querySelector('.pipe'), animation);
const clouds = new clouds_1.Clouds(document.querySelector('.clouds'));
const marioListener = new listeners_1.MarioJumpListener(mario);
const game = new game_1.Game(mario, pipe, document.querySelector('.score'), gameTimer);
const menu = new menu_1.Menu(document.querySelector('.start'), document.querySelector('.game-menu__p'), document.querySelector('.game-menu__p-top-score'), game, mario, pipe, startGameTimer);
menu.setTopScore();
game.menu = menu;

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map