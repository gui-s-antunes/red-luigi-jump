import { GameProtocol } from './interfaces/game-protocol';
import { MarioProtocol } from './interfaces/mario-protocol';
import { PipeProtocol } from './interfaces/pipe-protocol';

export class Menu {
  private _playButtonDiv: HTMLDivElement;

  constructor(
    private _playButton: HTMLButtonElement,
    private _scoreP: HTMLParagraphElement,
    private _topScoreP: HTMLParagraphElement,
    private readonly game: GameProtocol,
    private readonly mario: MarioProtocol,
    private readonly pipe: PipeProtocol,
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
    this.mario.resetMario();
    this.pipe.resetPipe();
    this.hiddenMenu();
    this.game.startGame();
  }

  gameFinished(): void {
    this.showMenu();
    this.setScore();
    this.setTopScore();
  }

  setTopScore(): void {
    this._topScoreP.textContent = `Top Score: ${this.game.topScore}`;
  }

  setScore(): void {
    this._scoreP.textContent = `Score: ${this.game.points}`;
  }
}
