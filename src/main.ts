import { Clouds } from './clouds';
import { Game } from './game';
import { Menu } from './menu';
import { Mario } from './mario';
import { Pipe } from './pipe';
import { Animation } from './animation';
import { TimerInterval, TimerTimeout } from './timer';
import { MarioJumpListener } from './listeners';

// Animation Class Controller
const animation = new Animation();

// timers

const startGameTimer = new TimerTimeout(); // to reset all sprites before game start
const marioJumpTimer = new TimerTimeout();
const gameTimer = new TimerInterval();

// Sprites
const mario = new Mario(
  document.querySelector('.mario') as HTMLImageElement,
  animation,
  marioJumpTimer,
);

const pipe = new Pipe(
  document.querySelector('.pipe') as HTMLImageElement,
  animation,
);

// const clouds = new Clouds(
//   document.querySelector('.clouds') as HTMLImageElement,
// );

// Listeners

// const marioListener = new MarioJumpListener(mario);

// Game
const game = new Game(
  mario,
  pipe,
  document.querySelector('.score') as HTMLParagraphElement,
  gameTimer,
);

// HUD
const menu = new Menu(
  document.querySelector('.start') as HTMLButtonElement,
  document.querySelector('.game-menu__p') as HTMLParagraphElement,
  document.querySelector('.game-menu__p-top-score') as HTMLParagraphElement,
  game,
  mario,
  pipe,
  startGameTimer,
);
menu.setTopScore();

game.menu = menu;
