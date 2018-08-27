// PLAYER VARIABLES
let hexPlayerPos = hex(0,0);
let hexMoveTarget;

let playerRange = 3;
let speed = 0.15;

let hexCursor;


// called in setup() to initialize the player
function playerSetup() {
    player = new Sprite(resources["images/player.png"].texture);
    player.position.x = hexToPixel(gridLayout, hexPlayerPos).x;
    player.position.y = hexToPixel(gridLayout, hexPlayerPos).y;

    player.anchor.set(0.5,0.5);

    app.stage.addChild(player);
}


function playerMove(targetHex) {

    for (let i in grid) {
        for (let j in grid[i]) {

            if (grid[i][j] != undefined) {
                if (hexEqual(targetHex, grid[i][j].hex)) {

                    player.position.x = hexToPixel(gridLayout, targetHex).x;
                    player.position.y = hexToPixel(gridLayout, targetHex).y;

                    hexPlayerPos = hexRound(pixelToHex(gridLayout, new Point(player.position.x, player.position.y)));

                }
            }

        }
    }

}



function playerSmoothMove(h, step) {

    player.position.x = hexToPixel(gridLayout, hexLerp(hexPlayerPos, h, step)).x;
    player.position.y = hexToPixel(gridLayout, hexLerp(hexPlayerPos, h, step)).y;

    // need to account for when going up or left
    if (player.position.x >= hexToPixel(gridLayout, h).x && player.position.y >= hexToPixel(gridLayout, h).y) {
        
        player.position.x = hexToPixel(gridLayout, h).x;
        player.position.y = hexToPixel(gridLayout, h).y;

        return true;
    } else {
        return false;
    }

    
}


function playerDisplayRange() {
    let ret = new Container;
    for (let i in grid) {
        for (let j in grid[i]) {

            if (grid[i][j] != undefined && hexDistance(hexPlayerPos, grid[i][j].hex) <= playerRange) {
                let spr = new Sprite(resources["images/hex_alpha.png"].texture);
                spr.position.x = hexToPixel(gridLayout, grid[i][j].hex).x;
                spr.position.y = hexToPixel(gridLayout, grid[i][j].hex).y;
                spr.anchor.set(0.5 , 0.5);
                ret.addChild(spr);
            }
        }
    }

    return ret;
}