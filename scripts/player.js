// PLAYER VARIABLES
let hexPlayerPos = hex(0,0);


// called in setup() to initialize the player
function playerSetup() {
    player = new Sprite(resources["images/player.png"].texture);
    player.position.x = hexToPixel(gridLayout, hexPlayerPos).x;
    player.position.y = hexToPixel(gridLayout, hexPlayerPos).y;

    player.anchor.set(0.5,0.5);

    app.stage.addChild(player);
}


