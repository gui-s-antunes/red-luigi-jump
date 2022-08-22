import { MenuProtocol } from './menu-protocol';

export interface GameProtocol {
  points: number;
  topScore: number;

  getMenu(): MenuProtocol | undefined;

  startTimestamp(): void;

  hiddenGameScore(): void;

  showGameScore(): void;

  updateGameScore(): void;

  getTopScoreFromBrowser(): number;

  updateTopScore(): void;

  compareNewScoreWithTopScore(): void;

  isNewScoreBetter(): boolean;

  startGame(): void;

  stopGame(): void;

  stopIntervals(): void;

  stopSpritesAnimation(): void;

  verifyMarioDanger(): void;

  isMarioOnDanger(marioPosition: DOMRect, pipePosition: DOMRect): boolean;

  isPipeUnderMario(marioPosition: DOMRect, pipePosition: DOMRect): boolean;
}
