import { GameProtocol } from '../interfaces/game-protocol';
import { TimerProtocol } from '../interfaces/timer-protocol';

export class Menu {
  private _playButtonDiv: HTMLDivElement;

  constructor(
    private _playButton: HTMLButtonElement,
    private _scoreP: HTMLParagraphElement,
    private _topScoreP: HTMLParagraphElement,
    private readonly game: GameProtocol,
    private readonly startTimer: TimerProtocol,
  ) {
    this._playButtonDiv = this._playButton.parentElement as HTMLDivElement;
    this._playButton.addEventListener(
      'click',
      this.playButtonPressed.bind(this),
    );
  }

  hiddenMenu(): void {
    this._playButtonDiv.style.display = 'none';
  }

  showMenu(): void {
    this._playButtonDiv.style.display = 'flex';
  }

  showMenuScore(): void {
    this._scoreP.style.display = 'block';
  }

  playButtonPressed(): void {
    this.hiddenMenu();
    this.game.resetSpriteStatement();
    this.startTimer.setTimer(this.game, 'startGame', 10);
  }

  gameFinished(): void {
    this.showMenu();
    this.setScore();
    this.setTopScore();
    this.showMenuScore();
  }

  setTopScore(): void {
    this._topScoreP.textContent = `Top Score: ${this.game.topScore}`;
  }

  setScore(): void {
    this._scoreP.textContent = `Score: ${this.game.points}`;
  }
}
