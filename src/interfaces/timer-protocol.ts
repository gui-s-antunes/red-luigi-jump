export interface TimerProtocol {
  setTimer(func: () => void, milliseconds: number): void;
  clearTimer(): void;
}
