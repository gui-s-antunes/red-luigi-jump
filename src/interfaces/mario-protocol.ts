export interface MarioProtocol {
  marioSprite: Readonly<HTMLImageElement>;

  addMarioJump(): void;

  removeMarioJump(): void;

  runMarioAnimation(): void;

  pauseMarioAnimation(): void;

  changeMarioSpriteImage(imageSrc: string): void;

  marioContainsJump(): boolean;

  resetMario(): void;

  getMarioPosition(): DOMRect;

  stopMarioInterval(): void;
}
