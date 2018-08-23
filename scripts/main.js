
//PIXI SHORTCUTS
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;


//VARIABLES
let state;
const gridSize = new vector2(50,50);
const gridOrigin = new vector2(256,256);
const gridContainer = new PIXI.Container();
let player;
let startPos = new hex(0,0);


let grid = [
    new hex(0,0, "red"),
    new hex(0,1),
    new hex(-1,1),
    new hex(1,-1),
    new hex(-1,0),
    new hex(0,-1),
    new hex(1,0),
    new hex(-1,-1),
    new hex(1,1),
    new hex(-2,0),
    new hex(0,-2),
    new hex(2,0),
    new hex(0,2),
    new hex(1,-2),
    new hex(-2, 1),
    new hex(-1,2),
    new hex(2,-1),
    new hex(2,-2),
    new hex(-2,2)
]


//APP DECLARATION
let app = new Application({
    width: 512, 
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
});


//LOADING & SETUP
loader
    .add("../images/player.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log('loading : ' + resource.url);
    console.log("progress : " + loader.progress + "%");
}

function setup () {
    state = gridDraw;
    app.ticker.add(delta => GameLoop(delta));

    gridLayout = new Layout(Layout.flat, gridSize, gridOrigin);
    app.stage.addChild(gridContainer);

    player = new Sprite(
        resources["../images/player.png"].texture
    );
    app.stage.addChild(player);
    player.position.set(gridLayout.hexToPixel(startPos).x, gridLayout.hexToPixel(startPos).y);
    player.anchor.set(0.5, 0.5);

}


//GAMELOOP & STATES
function GameLoop (delta) {
    state(delta);
}

function gridDraw (delta) {
    for (let i in grid) {
        gridContainer.addChild(grid[i].draw(gridLayout));
    }

    state = play;
}

function play (delta) {

}



//Utils
/*function hexMove(sprite, v2Pos, layout=gridLayout) {
    sprite.position.set(layout.hexToPixel(v2Pos).x, layout.hexToPixel(v2Pos).y);
}*/