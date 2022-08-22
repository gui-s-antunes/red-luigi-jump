import { TimerProtocol } from '../interfaces/timer-protocol';

export class TimerInterval implements TimerProtocol {
  private _timer: NodeJS.Timer | null = null;

  // setTimer(func: () => void, milliseconds: number): void {
  //   this._timer = setInterval(func, milliseconds);
  // }
  setTimer(obj: any, objMethod: string, milliseconds: number): void {
    this._timer = setInterval(() => {
      obj[objMethod]();
    }, milliseconds);
  }
  clearTimer(): void {
    if (this._timer) clearInterval(this._timer);
  }
}

export class TimerTimeout implements TimerProtocol {
  private _timer: NodeJS.Timer | null = null;

  setTimer(obj: any, objMethod: string, milliseconds: number): void {
    this._timer = setTimeout(() => {
      obj[objMethod]();
    }, milliseconds);
  }
  clearTimer(): void {
    if (this._timer) clearTimeout(this._timer);
  }
}
