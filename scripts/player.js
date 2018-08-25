// PLAYER VARIABLES
let hexPlayerPos = hex(0,0);
let hexMoveTarget;


// called in setup() to initialize the player
function playerSetup() {
    player = new Sprite(resources["images/player.png"].texture);
    player.position.x = hexToPixel(gridLayout, hexPlayerPos).x;
    player.position.y = hexToPixel(gridLayout, hexPlayerPos).y;

    player.anchor.set(0.5,0.5);

    app.stage.addChild(player);
}

function playerMove(targetHex) {
    player.position.x = hexToPixel(gridLayout, targetHex).x;
    player.position.y = hexToPixel(gridLayout, targetHex).y;

    hexPlayerPos = hexRound(pixelToHex(gridLayout, new Point(player.position.x, player.position.y)));
    console.log(hexPlayerPos);
}
