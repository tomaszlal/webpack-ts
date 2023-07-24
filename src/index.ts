import { GameManager } from "./pixi_env";

window.onload = () => {
    const newGame = new GameManager();
    console.log(newGame);
    newGame.addTicker();
   
};