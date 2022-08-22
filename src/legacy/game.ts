export class Points {
  constructor(private _points: number) {}

  set points(newPoints: number) {
    this._points = newPoints;
  }

  get points(): number {
    return this._points;
  }
}

export class Mario {
  private _points: Points = new Points(0);

  constructor(private _startTime: number, private _endTime: number) {}

  set endTime(time: number) {
    this._endTime = time;
  }

  get endTime(): number {
    return this._endTime;
  }

  set startTime(time: number) {
    this._startTime = time;
  }

  get startTime(): number {
    return this._startTime;
  }

  calcPoints(): number {
    return this.endTime - this.startTime;
  }

  setPoints(): void {
    this._endTime = +new Date();
    this._points.points = this.calcPoints();
  }

  get points(): number {
    return this._points.points;
  }
}

// const mario = new Mario(+new Date());
