import { GameManager } from "./GameManager";

window.onload = () => {
    const newGame = new GameManager();
    console.log(newGame);
    newGame.addTicker();
   
};