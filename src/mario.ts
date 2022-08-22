import { AnimationProtocol } from './interfaces/animation-protocol';
import { MarioProtocol } from './interfaces/mario-protocol';
import { TimerProtocol } from './interfaces/timer-protocol';

export class Mario implements MarioProtocol {
  constructor(
    private readonly _marioSprite: HTMLImageElement,
    private readonly animation: AnimationProtocol,
    private readonly marioJumpTimer: TimerProtocol,
  ) {}

  get marioSprite(): HTMLImageElement {
    return this._marioSprite;
  }

  addMarioJump(): void {
    // this._marioSprite.classList.add('jump');
    this.marioJumpTimer.setTimer(this.removeMarioJump, 900);
    this.animation.addAnimationProperty(this.marioSprite); // agora é animation todas as animações
  }

  removeMarioJump(): void {
    // this._marioSprite.classList.remove('jump');
    this.animation.removeAnimationProperty(this.marioSprite);
  }

  runMarioAnimation(): void {
    this.animation.runAnimation(this.marioSprite);
  }

  pauseMarioAnimation(): void {
    this.animation.pauseAnimation(this.marioSprite);
  }

  changeMarioSpriteImage(imageSrc: string): void {
    this._marioSprite.src = imageSrc;
  }

  marioContainsJump(): boolean {
    return this.marioSprite.classList.contains('jump');
  }

  resetMario(): void {
    this.removeMarioJump();
    this.changeMarioSpriteImage('./assets/images/mario_gif_cortado.gif');
    this.runMarioAnimation();
  }

  getMarioPosition(): DOMRect {
    return this.marioSprite.getBoundingClientRect();
  }

  stopMarioInterval(): void {
    this.marioJumpTimer.clearTimer();
  }
}
