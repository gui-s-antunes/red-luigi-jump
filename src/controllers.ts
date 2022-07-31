import './game';
import { Mario } from './game';

export const marioSprite = document.querySelector('.mario') as HTMLImageElement;
export const pipeSprite = document.querySelector('.pipe') as HTMLImageElement;
export const playButton = document.querySelector('.start') as HTMLButtonElement;
export const playScore = document.querySelector(
  '.game-menu__p',
) as HTMLParagraphElement;
export const playTopScore = document.querySelector(
  '.game-menu__p-top-score',
) as HTMLParagraphElement;

export const scoreP = document.querySelector('.score') as HTMLParagraphElement;
export let topScore = getTopScore();

export let intervalController: null | NodeJS.Timer = null;
export let intervalMarioChecker: null | NodeJS.Timer = null;
export let timeoutMarioController: null | NodeJS.Timer = null;

export const mario = new Mario(0, 0);

export let marioPosition = getElementPosition(marioSprite);
export let pipePosition = getElementPosition(pipeSprite);

document.addEventListener('keydown', (event) => {
  if (marioSprite.classList.contains('jump')) return;
  if (event.key === ' ' || event.key === 'ArrowUp') setJump();
});

playButton.addEventListener('click', () => {
  resetPipe(pipeSprite);
  resetMario(marioSprite);
  switchPlayButton();
  startGame();
  mario.startTime = +new Date();
  startInterval();
});

export function resetMario(mario: HTMLImageElement): void {
  mario.classList.remove('jump');
  mario.src = './assets/images/mario_gif_cortado.gif';
  mario.style.animationPlayState = 'running';
}

export function resetPipe(pipe: HTMLImageElement): void {
  pipe.classList.remove('pipe-animation');
}

export function startInterval(): void {
  intervalController = setInterval(() => {
    mario.setPoints();
    scoreP.textContent = `Score: ${mario.points}`;
  }, 50);
}

export function switchPlayButton(): void {
  const playbuttonDiv = playButton.parentElement as HTMLDivElement;

  playbuttonDiv.style.display =
    window.getComputedStyle(playbuttonDiv, null).display === 'flex'
      ? 'none'
      : 'flex';
}

export function startGame(): void {
  playScore.style.display = 'block';

  pipeSprite.classList.add('pipe-animation');
  pipeSprite.style.animationPlayState = 'running';

  intervalMarioChecker = setInterval(() => {
    marioPosition = getElementPosition(marioSprite);
    pipePosition = getElementPosition(pipeSprite);

    if (!isMarioOnDanger()) return;

    if (isPipeUnderMario()) stopGame();
  }, 15);
}

export function stopGame(): void {
  clearIntervalTimeOut('timeout', timeoutMarioController);
  clearIntervalTimeOut('interval', intervalController, intervalMarioChecker);

  stopAnimations(pipeSprite, marioSprite);

  setMarioGameOverSprite('./assets/images/game-over.png');

  setFinalScore();
  compareFinalScoreToTopScore(mario.points);
  setTopScore(playTopScore, topScore);

  switchPlayButton();
}

export function clearIntervalTimeOut(clearType: string, ...args: any[]): void {
  args.forEach((timer) =>
    clearType === 'interval' ? clearInterval(timer) : clearTimeout(timer),
  );
}

export function stopAnimations(...sprites: HTMLImageElement[]): void {
  sprites.forEach((sprite) => (sprite.style.animationPlayState = 'paused'));
}

export function setMarioGameOverSprite(path: string): void {
  marioSprite.src = path;
}

export function getTopScore(): number {
  return localStorage['mario_top_score'] ?? 0;
}

export function compareFinalScoreToTopScore(finalScore: number): void {
  if (finalScore > topScore) topScore = finalScore;
  topScore = finalScore > topScore ? finalScore : topScore;
  localStorage['mario_top_score'] = topScore;
}

export function setTopScore(
  domTopScore: HTMLParagraphElement,
  topScore: number,
): void {
  domTopScore.textContent = `Top Score: ${topScore}`;
}

export function setFinalScore(): void {
  playScore.textContent = `Final Score: ${mario.points}`;
}

export function setJump(): void {
  marioSprite.classList.add('jump');

  timeoutMarioController = setTimeout(() => {
    marioSprite.classList.remove('jump');
  }, 900);
}

function getElementPosition(element: HTMLImageElement): DOMRect {
  return element.getBoundingClientRect();
}

function isMarioOnDanger(): boolean {
  return marioPosition.bottom >= pipePosition.top;
}

function isPipeUnderMario(): boolean {
  return (
    pipePosition.left <= marioPosition.right &&
    pipePosition.right >= (marioPosition.right + marioPosition.left) / 2
  );
}
