// import { Clouds } from './classes/clouds';
import { Game } from './classes/game';
import { Menu } from './classes/menu';
import { Mario } from './classes/mario';
import { Pipe } from './classes/pipe';
import { Animation } from './classes/animation';
import { TimerInterval, TimerTimeout } from './classes/timer';
// import { MarioJumpListener } from './listeners';

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
