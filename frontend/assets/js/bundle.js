/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers.ts":
/*!****************************!*\
  !*** ./src/controllers.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setJump = exports.setFinalScore = exports.setTopScore = exports.compareFinalScoreToTopScore = exports.getTopScore = exports.setMarioGameOverSprite = exports.stopAnimations = exports.clearIntervalTimeOut = exports.stopGame = exports.startGame = exports.switchPlayButton = exports.startInterval = exports.resetPipe = exports.resetMario = exports.pipePosition = exports.marioPosition = exports.mario = exports.timeoutMarioController = exports.intervalMarioChecker = exports.intervalController = exports.topScore = exports.scoreP = exports.playTopScore = exports.playScore = exports.playButton = exports.pipeSprite = exports.marioSprite = void 0;
__webpack_require__(/*! ./game */ "./src/game.ts");
const game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
exports.marioSprite = document.querySelector('.mario');
exports.pipeSprite = document.querySelector('.pipe');
exports.playButton = document.querySelector('.start');
exports.playScore = document.querySelector('.game-menu__p');
exports.playTopScore = document.querySelector('.game-menu__p-top-score');
exports.scoreP = document.querySelector('.score');
exports.topScore = getTopScore();
exports.intervalController = null;
exports.intervalMarioChecker = null;
exports.timeoutMarioController = null;
exports.mario = new game_1.Mario(0, 0);
exports.marioPosition = getElementPosition(exports.marioSprite);
exports.pipePosition = getElementPosition(exports.pipeSprite);
document.addEventListener('keydown', (event) => {
    if (exports.marioSprite.classList.contains('jump'))
        return;
    if (event.key === ' ' || event.key === 'ArrowUp')
        setJump();
});
exports.playButton.addEventListener('click', () => {
    resetPipe(exports.pipeSprite);
    resetMario(exports.marioSprite);
    switchPlayButton();
    startGame();
    exports.mario.startTime = +new Date();
    startInterval();
});
function resetMario(mario) {
    mario.classList.remove('jump');
    mario.src = './assets/images/mario_gif_cortado.gif';
    mario.style.animationPlayState = 'running';
}
exports.resetMario = resetMario;
function resetPipe(pipe) {
    pipe.classList.remove('pipe-animation');
}
exports.resetPipe = resetPipe;
function startInterval() {
    exports.intervalController = setInterval(() => {
        exports.mario.setPoints();
        exports.scoreP.textContent = `Score: ${exports.mario.points}`;
    }, 50);
}
exports.startInterval = startInterval;
function switchPlayButton() {
    const playbuttonDiv = exports.playButton.parentElement;
    playbuttonDiv.style.display =
        window.getComputedStyle(playbuttonDiv, null).display === 'flex'
            ? 'none'
            : 'flex';
}
exports.switchPlayButton = switchPlayButton;
function startGame() {
    exports.playScore.style.display = 'block';
    exports.pipeSprite.classList.add('pipe-animation');
    exports.pipeSprite.style.animationPlayState = 'running';
    exports.intervalMarioChecker = setInterval(() => {
        exports.marioPosition = getElementPosition(exports.marioSprite);
        exports.pipePosition = getElementPosition(exports.pipeSprite);
        if (!isMarioOnDanger())
            return;
        if (isPipeUnderMario())
            stopGame();
    }, 15);
}
exports.startGame = startGame;
function stopGame() {
    clearIntervalTimeOut('timeout', exports.timeoutMarioController);
    clearIntervalTimeOut('interval', exports.intervalController, exports.intervalMarioChecker);
    stopAnimations(exports.pipeSprite, exports.marioSprite);
    setMarioGameOverSprite('./assets/images/game-over.png');
    setFinalScore();
    compareFinalScoreToTopScore(exports.mario.points);
    setTopScore(exports.playTopScore, exports.topScore);
    switchPlayButton();
}
exports.stopGame = stopGame;
function clearIntervalTimeOut(clearType, ...args) {
    args.forEach((timer) => clearType === 'interval' ? clearInterval(timer) : clearTimeout(timer));
}
exports.clearIntervalTimeOut = clearIntervalTimeOut;
function stopAnimations(...sprites) {
    sprites.forEach((sprite) => (sprite.style.animationPlayState = 'paused'));
}
exports.stopAnimations = stopAnimations;
function setMarioGameOverSprite(path) {
    exports.marioSprite.src = path;
}
exports.setMarioGameOverSprite = setMarioGameOverSprite;
function getTopScore() {
    var _a;
    return (_a = localStorage['mario_top_score']) !== null && _a !== void 0 ? _a : 0;
}
exports.getTopScore = getTopScore;
function compareFinalScoreToTopScore(finalScore) {
    if (finalScore > exports.topScore)
        exports.topScore = finalScore;
    exports.topScore = finalScore > exports.topScore ? finalScore : exports.topScore;
    localStorage['mario_top_score'] = exports.topScore;
}
exports.compareFinalScoreToTopScore = compareFinalScoreToTopScore;
function setTopScore(domTopScore, topScore) {
    domTopScore.textContent = `Top Score: ${topScore}`;
}
exports.setTopScore = setTopScore;
function setFinalScore() {
    exports.playScore.textContent = `Final Score: ${exports.mario.points}`;
}
exports.setFinalScore = setFinalScore;
function setJump() {
    exports.marioSprite.classList.add('jump');
    exports.timeoutMarioController = setTimeout(() => {
        exports.marioSprite.classList.remove('jump');
    }, 900);
}
exports.setJump = setJump;
function getElementPosition(element) {
    return element.getBoundingClientRect();
}
function isMarioOnDanger() {
    return exports.marioPosition.bottom >= exports.pipePosition.top;
}
function isPipeUnderMario() {
    return (exports.pipePosition.left <= exports.marioPosition.right &&
        exports.pipePosition.right >= (exports.marioPosition.right + exports.marioPosition.left) / 2);
}


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mario = exports.Points = void 0;
class Points {
    constructor(_points) {
        this._points = _points;
    }
    set points(newPoints) {
        this._points = newPoints;
    }
    get points() {
        return this._points;
    }
}
exports.Points = Points;
class Mario {
    constructor(_startTime, _endTime) {
        this._startTime = _startTime;
        this._endTime = _endTime;
        this._points = new Points(0);
    }
    set endTime(time) {
        this._endTime = time;
    }
    get endTime() {
        return this._endTime;
    }
    set startTime(time) {
        this._startTime = time;
    }
    get startTime() {
        return this._startTime;
    }
    calcPoints() {
        return this.endTime - this.startTime;
    }
    setPoints() {
        this._endTime = +new Date();
        this._points.points = this.calcPoints();
    }
    get points() {
        return this._points.points;
    }
}
exports.Mario = Mario;


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./controllers */ "./src/controllers.ts");
const controllers_1 = __webpack_require__(/*! ./controllers */ "./src/controllers.ts");
(0, controllers_1.setTopScore)(controllers_1.playTopScore, controllers_1.topScore);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map