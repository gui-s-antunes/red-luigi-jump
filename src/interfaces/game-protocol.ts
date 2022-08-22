export interface GameProtocol {
  points: number;

  topScore: number;

  getTopScoreFromBrowser(): number;

  startGame(): void;
}
