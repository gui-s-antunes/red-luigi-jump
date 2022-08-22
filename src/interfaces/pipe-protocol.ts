export interface PipeProtocol {
  pipeSprite: Readonly<HTMLImageElement>;
  resetPipe(): void;
  addPropertyAnimation(): void;
  runPipeAnimation(): void;
  pausePipeAnimation(): void;
  getPipePosition(): DOMRect;
}
