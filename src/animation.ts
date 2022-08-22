import { AnimationProtocol } from './interfaces/animation-protocol';

export class Animation implements AnimationProtocol {
  removeAnimationProperty(sprite: HTMLImageElement): void {
    sprite.classList.remove('animation');
  }

  addAnimationProperty(sprite: HTMLImageElement): void {
    sprite.classList.add('animation');
  }

  runAnimation(sprite: HTMLImageElement): void {
    sprite.style.animationPlayState = 'running';
  }

  pauseAnimation(sprite: HTMLImageElement): void {
    sprite.style.animationPlayState = 'paused';
  }
}
