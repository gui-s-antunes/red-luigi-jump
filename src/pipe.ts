import { AnimationProtocol } from './interfaces/animation-protocol';
import { PipeProtocol } from './interfaces/pipe-protocol';

export class Pipe implements PipeProtocol {
  constructor(
    private readonly _pipeSprite: HTMLImageElement,
    private readonly animation: AnimationProtocol,
  ) {}
  stopPipeAnimation(): void {
    throw new Error('Method not implemented.');
  }

  get pipeSprite(): HTMLImageElement {
    return this._pipeSprite;
  }

  resetPipe(): void {
    this.animation.removeAnimationProperty(this.pipeSprite);
  }

  addPropertyAnimation(): void {
    this.animation.addAnimationProperty(this.pipeSprite);
  }

  runPipeAnimation(): void {
    this.animation.runAnimation(this.pipeSprite);
  }

  pausePipeAnimation(): void {
    this.animation.pauseAnimation(this.pipeSprite);
  }

  getPipePosition(): DOMRect {
    return this.pipeSprite.getBoundingClientRect();
  }
}
