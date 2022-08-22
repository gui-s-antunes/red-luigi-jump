export class Clouds {
  constructor(private readonly _clouds: HTMLImageElement) {}

  get clouds(): HTMLImageElement {
    return this._clouds;
  }
}
