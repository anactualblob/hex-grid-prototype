
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

let grid = [
    new hex(0,0),
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
    new hex(0,2)
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
