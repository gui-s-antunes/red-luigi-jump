import { GameProtocol } from './interfaces/game-protocol';
import { MarioProtocol } from './interfaces/mario-protocol';
import { MenuProtocol } from './interfaces/menu-protocol';
import { PipeProtocol } from './interfaces/pipe-protocol';
import { TimerProtocol } from './interfaces/timer-protocol';

export class Game implements GameProtocol {
  private _topScore: number;
  private _points = 0;
  private _gameTimestamp = 0;
  private _menu: MenuProtocol | null = null;

  constructor(
    private readonly mario: MarioProtocol,
    private readonly pipe: PipeProtocol,
    private _scoreGame: HTMLParagraphElement,
    private readonly gameTimer: TimerProtocol,
  ) {
    this._topScore = this.getTopScoreFromBrowser();
  }

  get points(): number {
    return this._points;
  }

  set points(points: number) {
    this._points = points - this._gameTimestamp;
  }

  get topScore(): number {
    return this._topScore;
  }

  set topScore(topScore: number) {
    this.topScore = topScore;
  }

  set menu(menu: MenuProtocol) {
    this._menu = menu;
  }

  getMenu(): MenuProtocol | undefined {
    if (this._menu !== null) return this._menu;
  }

  startTimestamp(): void {
    this._gameTimestamp = +new Date();
  }

  hiddenGameScore(): void {
    this._scoreGame.style.display = 'none';
  }

  showGameScore(): void {
    this._scoreGame.style.display = 'block';
  }

  updateGameScore(): void {
    this.points = +new Date();
    this._scoreGame.textContent = `Score: ${this.points}`;
  }

  getTopScoreFromBrowser(): number {
    return localStorage['mario_top_score'] ?? 0;
  }

  updateTopScore(): void {
    localStorage['mario_top_score'] = this.topScore;
  }

  compareNewScoreWithTopScore(): void {
    if (!this.isNewScoreBetter()) return;
    this._topScore = this.points;
    this.updateTopScore();
  }

  isNewScoreBetter(): boolean {
    return this.points > this.topScore;
  }

  startGame(): void {
    this.showGameScore();
    this.pipe.addPropertyAnimation();
    this.pipe.runPipeAnimation();
    this.startTimestamp();
    this.gameTimer.setTimer(this, 'verifyMarioDanger', 15);
  }

  stopGame(): void {
    this.stopIntervals();
    this.stopSpritesAnimation();

    this.mario.changeMarioSpriteImage('./assets/images/game-over.png');

    this.compareNewScoreWithTopScore();

    this._menu?.gameFinished();
  }

  stopIntervals(): void {
    this.gameTimer.clearTimer();
    this.mario.stopMarioInterval();
  }

  stopSpritesAnimation(): void {
    this.mario.pauseMarioAnimation();
    this.pipe.pausePipeAnimation();
  }

  verifyMarioDanger(): void {
    this.updateGameScore();

    const marioPosition = this.mario.getMarioPosition();
    const pipePosition = this.pipe.getPipePosition();

    if (!this.isMarioOnDanger(marioPosition, pipePosition)) return;

    if (!this.isPipeUnderMario(marioPosition, pipePosition)) return;

    this.stopGame();
  }

  isMarioOnDanger(marioPosition: DOMRect, pipePosition: DOMRect): boolean {
    return marioPosition.bottom >= pipePosition.top;
  }

  isPipeUnderMario(marioPosition: DOMRect, pipePosition: DOMRect): boolean {
    return (
      pipePosition.left <= marioPosition.right &&
      pipePosition.right >= (marioPosition.right + marioPosition.left) / 2
    );
  }
}
