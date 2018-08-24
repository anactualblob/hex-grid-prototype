//PIXI SHORTCUTS
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    Point = PIXI.Point;
    Container = PIXI.Container;

//APP DECLARATION
let app = new Application({
    width: 512, 
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
});

//GRID VARIABLES
let gridSize = new Point(25,25);
let gridOrigin = new Point(85,100);
let gridLayout;
let gridContainer = new Container;



//LOADING & SETUP
loader
    .add("images/player.png")
    .add("images/hex_white.png")
    .add("images/hex_red.png")
    .add("images/hex_blue.png")
    .add("images/hex_green.png")
    .add("images/hex_yellow.png")
    .add("images/hex_alpha.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log('loading : ' + resource.url);
    console.log("progress : " + loader.progress + "%");
}

function setup () {

    //Variable Setting
    gridLayout = Layout(flat, gridSize, gridOrigin);
    app.stage.addChild(gridContainer);

    //SPRITES
    //Player
    player = new Sprite(resources["images/player.png"].texture);
    player.position.x = hexToPixel(gridLayout, hex(0,0)).x;
    player.position.y = hexToPixel(gridLayout, hex(0,0)).y;

    player.anchor.set(0.5,0.5);

    app.stage.addChild(player);
    
    //Hexes

    

    // Starting gameloop at play state
    state = play;
    gridLoading(level);
    app.ticker.add(delta => GameLoop(delta));
    
}