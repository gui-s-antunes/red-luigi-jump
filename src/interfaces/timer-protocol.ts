export interface TimerProtocol {
  // setTimer(func: () => void, milliseconds: number): void;
  setTimer(obj: any, objMethod: string, milliseconds: number): void;
  clearTimer(): void;
}
