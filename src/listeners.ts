import { MarioProtocol } from './interfaces/mario-protocol';

export class MarioJumpListener {
  constructor(private readonly _mario: MarioProtocol) {
    document.addEventListener('keydown', this.jumpController.bind(this));
  }

  get mario(): MarioProtocol {
    return this._mario;
  }

  jumpController(event: KeyboardEvent): void {
    if (event.key !== ' ' && event.key !== 'ArrowUp') return;
    // if (this.marioContainsJump()) return;
    if (this.mario.marioContainsJump()) return;

    this.addMarioJumpClass();
  }

  addMarioJumpClass(): void {
    // fazer timer para isso, add um timer.ts e faz o timer lá, adiciona o protocol dele no constructor e usa na classe aqui
    this.mario.addMarioJump();
  }
}
