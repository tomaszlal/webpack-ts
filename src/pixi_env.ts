import * as PIXI from "pixi.js";



export class GameManager {
    private app:PIXI.Application;
    public tetrisBlock1:PIXI.Sprite = new PIXI.Sprite();
    public tetrisBlock2:PIXI.Sprite = new PIXI.Sprite();
    public loaderPixi:PIXI.Loader = new PIXI.Loader();
    public sprites: Array<PIXI.Sprite> = [];
    public tetContainer:PIXI.Container = new PIXI.Container();

    public constructor(){
        this.app = new PIXI.Application({width:600, height:600, backgroundColor:0xEEEEEE});
        
        document.body.appendChild(this.app.view);

        this.init();
     }

    public addTicker(): void {
        this.app.ticker.add((delta) =>{
            this.tetrisBlock2.rotation += 0.01;
            this.tetrisBlock1.rotation += 0.005;
        })
       
    }
    
    public  init(){

        this.loaderPixi.add('tet1','/assets/images/tet_1.png')
            .add('tet2','/assets/images/tet_2.png')
            .add('tet','/assets/images/tet.png')
            .load();

        this.loaderPixi.onComplete.add((resources)=>{
            console.log(resources.resources);

            // resources.resources.
            // conveert objects from resourses to aray
            let resourcesArray = Object.keys(resources.resources).map((key) =>[key, resources.resources[key]]);
            console.log(resourcesArray);
            
            //generate sprites from resourses
            resourcesArray.forEach(element =>{
                console.log(element[1].texture);
                this.sprites.push(PIXI.Sprite.from(element[1].texture));
            })

            console.log("Sprites loaded");
            console.log(this.sprites);

            this.sprites.forEach(element => {
                element.interactive = true;
                element.anchor.set(0.5);
                element.x = Math.random() * this.app.screen.width;
                element.y = Math.random() * this.app.screen.height;
                element.on("pointertap", () =>{
                    element.rotation+= Math.PI/2;
                })
                this.app.stage.addChild(element);
            })
            
            //create the tetris block from element tet (tetContainer
            this.tetContainer.width = 96;
            this.tetContainer.height = 24;
           
            for (let i = 0; i <4 ;i++) {
                const element = PIXI.Sprite.from(resources.resources.tet.texture);
                element.x = i*24;
                element.y = 0;
                this.tetContainer.addChild(element);
            }
            this.tetContainer.x = 0;
            this.tetContainer.y = 0;
            // this.tetContainer.pivot.x = this.tetContainer.width /2;
            // this.tetContainer.pivot.y = this.tetContainer.height /2;
            this.app.stage.addChild(this.tetContainer);



        });

        
       
        // // first block tetris
        // let texture = PIXI.Texture.from('/assets/images/tet_1.png');
        // this.tetrisBlock1 = PIXI.Sprite.from(texture);
        // this.tetrisBlock1.anchor.x = 0.5;
        // this.tetrisBlock1.anchor.y = 0.5;
        // this.tetrisBlock1.x = this.app.screen.width / 2;
        // this.tetrisBlock1.y = this.app.screen.height / 2;
        // this.app.stage.addChild(this.tetrisBlock1);

      
        // this.tetrisBlock1.interactive=true;
        // this.tetrisBlock1.on('pointertap', ()=> {
        //     this.tetrisBlock1.y += 100;
        //     if (this.tetrisBlock1.y >= this.app.screen.height){
        //         this.tetrisBlock1.y = 100;
        //     }
        // })

        // // second block tetris
        // texture = PIXI.Texture.from('/assets/images/tet_2.png');
        // this.tetrisBlock2 = PIXI.Sprite.from(texture);
        // this.tetrisBlock2.anchor.x = 0.5;
        // this.tetrisBlock2.anchor.y = 0.5;
        // this.tetrisBlock2.x = 200;
        // this.tetrisBlock2.y = 200;
        // this.app.stage.addChild(this.tetrisBlock2);
        // this.tetrisBlock2.interactive = true;
        // this.tetrisBlock2.on('pointertap', () => {
        //     this.tetrisBlock2.x +=100;
        //     if (this.tetrisBlock2.x >= this.app.screen.width) {
        //         this.tetrisBlock2.x = 100;
        //     }
        // })
    }
    
}