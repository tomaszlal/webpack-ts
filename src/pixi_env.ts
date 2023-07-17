import * as PIXI from "pixi.js";


export class GameManager {
    private app:PIXI.Application;
    public tetrisBlock2:PIXI.Sprite = new PIXI.Sprite();

    public constructor(){
        this.app = new PIXI.Application({width:600, height:600, backgroundColor:0xEEEEEE});
        
        document.body.appendChild(this.app.view);

        console.log(this.app);

        let texture = PIXI.Texture.from('/assets/images/tet_1.png');
        const tetrisBlock = PIXI.Sprite.from(texture);
        tetrisBlock.anchor.x = 0.5;
        tetrisBlock.anchor.y = 0.5;
        tetrisBlock.x = this.app.screen.width / 2;
        tetrisBlock.y = this.app.screen.height / 2;
        this.app.stage.addChild(tetrisBlock);

        texture = PIXI.Texture.from('/assets/images/tet_2.png');
        this.tetrisBlock2 = PIXI.Sprite.from(texture);
        this.tetrisBlock2.anchor.x = 0.5;
        this.tetrisBlock2.anchor.y = 0.5;
        this.tetrisBlock2.x = 200;
        this.tetrisBlock2.y = 200;
        this.app.stage.addChild(this.tetrisBlock2);
        this.tetrisBlock2.interactive = true;
        this.tetrisBlock2.on('pointertap', () => {
            this.tetrisBlock2.x +=100;
            if (this.tetrisBlock2.x >= this.app.screen.width) {
                this.tetrisBlock2.x = 100;
            }
        })
       
        
       

       
        

    }

    public addTicker(): void {
        this.app.ticker.add((delta) =>{

            // console.log(this.app.stage.getChildAt(0));


            this.app.stage.getChildAt(0).rotation += 0.02;
            
           
        })
       
    }
   
    
}