export interface AnimationProtocol {
  removeAnimationProperty(sprite: HTMLImageElement): void;
  addAnimationProperty(sprite: HTMLImageElement): void;
  runAnimation(sprite: HTMLImageElement): void;
  pauseAnimation(sprite: HTMLImageElement): void;
}
