
//PIXI SHORTCUTS
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite; 

//APP DECLARATION
let app = new Application({
    width: 512, 
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
});

//VARIABLES
let state;
let subState;
const gridSize = new vector2(25,25);
const gridOrigin = new vector2(256,256);
const gridContainer = new PIXI.Container();
let hexCursor = new PIXI.Container();
let player;
let playerHex = new hex(0,0);
let mouseHex = new hex(0,0, "yellow");


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

let Event = app.renderer.plugins.interaction;


let mousePos = app.renderer.plugins.interaction.mouse.global;
let mouseHexPos;
let mouseSprite;


//LOADING & SETUP
loader
    .add("images/player.png")
    .add("images/red_hex.png")
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
    app.stage.addChild(hexCursor);


    player = new Sprite(
        resources["images/player.png"].texture
    );
    app.stage.addChild(player);
    player.position.set(gridLayout.hexToPixel(playerHex).x, gridLayout.hexToPixel(playerHex).y);
    player.anchor.set(0.5, 0.5);

    redHex = new Sprite(resources["images/red_hex.png"].texture);
    app.stage.addChild(redHex);
    redHex.anchor.set(0.5, 0.5);
    redHex.position.set(gridLayout.hexToPixel(new hex(1,1)).x, gridLayout.hexToPixel(new hex(1,1)).y);


    hexCursor.addChild(mouseHex.draw(gridLayout));
    hexCursor.visible = false;


    app.stage.interactive = true;


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
    subState = play_waitingForInput;
}

function play (delta) {

    //this is terrible and is going to need fixing someday
    for (let i in grid) {
        if (grid[i].equals(gridLayout.pixelToHex(mousePos).round())) {

            if (!grid[i].equals(gridLayout.pixelToHex(hexCursor))){

                //console.log("drawing");

                hexCursor.position.x = gridLayout.hexToPixel(grid[i]).x - 256;
                hexCursor.position.y = gridLayout.hexToPixel(grid[i]).y - 256;
                hexCursor.visible = true;
            }
            
        }
    }

    subState(delta);

}


function play_waitingForInput(delta) {
 
    Event.on('pointerdown', onClick);
}


function play_playerClicked(delta) {
    Event.on('pointerdown', function() {
        target = gridLayout.pixelToHex(mousePos).round();
        player.position.x = gridLayout.hexToPixel(target).x;
        player.position.y = gridLayout.hexToPixel(target).y;
        subState = play_waitingForInput;
        console.log("changing state : " + subState);
        
    });

}





function onClick() {
    console.log("click");   
    
    if (gridLayout.pixelToHex(mousePos).round().equals(playerHex)) {
        subState = play_playerClicked;
    }

}

//Utils
/*function hexMove(sprite, v2Pos, layout=gridLayout) {
    sprite.position.set(layout.hexToPixel(v2Pos).x, layout.hexToPixel(v2Pos).y);
}*/