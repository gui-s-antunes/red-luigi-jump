export interface MenuProtocol {
  // _playButtonDiv: HTMLDivElement;

  hiddenMenu(): void;

  showMenu(): void;

  // hiddenGameScore(): void;

  // showGameScore(): void;

  playButtonPressed(): void;

  gameFinished(): void;

  setTopScore(): void;

  setScore(): void;
}
