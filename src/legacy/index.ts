import './controllers';
import { playTopScore, setTopScore, topScore } from './controllers';

// fazer jump que adiciona jump ao class de mário e depois tira
// vai ter um botão de reiniciar no DOM, e aqui ele vai refazer o startime e endtime, e também recomeçar a contagem de pontos
// ao morrer, a contagem de pontos para também

setTopScore(playTopScore, topScore);
