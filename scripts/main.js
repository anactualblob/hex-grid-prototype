//VARIABLES
let state;
let substate;
let level = "level.txt";
let grid;

let click = false;

let mousePos = Interaction.mouse.global;

let step;
let point;
let line;




//GAMELOOP & STATES
function GameLoop (delta) {
    state(delta);

    Interaction.on ("pointerdown", () => {
        click = true;
    });
}



////////////////
// PLAY STATE //
////////////////
function play (delta) {

    // pretty ugly, maybe better way ?
    hexCursor.position.x = hexToPixel(gridLayout, hexRound(pixelToHex(gridLayout, mousePos))).x;
    hexCursor.position.y = hexToPixel(gridLayout, hexRound(pixelToHex(gridLayout, mousePos))).y;

    substate(delta);
}

// "Waiting for click" substate
function play_waitingForInput (delta) {

    //console.log("waitin");

    if (click) {
        substate = play_clicked;
        click = false;
    }
}

// "Click just happened" substate
function play_clicked(delta) {

    let hexClick = hexRound(pixelToHex(gridLayout, mousePos));

    if (hexEqual(hexClick, hexPlayerPos)) {
        substate = play_playerClicked;

        // display player range
        overlay.addChild(playerDisplayRange());

    } else {
        substate = play_waitingForInput;
    }
}

// "Player was clicked" substate
function play_playerClicked(delta) {
    if (click) {
        click = false;

        let hexClick = hexRound(pixelToHex(gridLayout, mousePos));
        
        if (hexDistance(hexPlayerPos, hexClick) <= playerRange) {
            //playerMove(hexClick);
            substate = play_playerMoving;
            
            line = hexLine(hexPlayerPos, hexClick);
            step = 0;
            point = 0;
            
            overlay.removeChildren (1, overlay.children.length);
        }
        
    }

}

// moving the player substate
function play_playerMoving() {

    if (!playerSmoothMove(line[point], step)) {
        step += speed;

    } else {
        if (point < line.length-1) {

            point++;
            step = speed;          
            hexPlayerPos = hexRound(pixelToHex(gridLayout, new Point(player.position.x, player.position.y)));

        } else {

            hexPlayerPos = hexRound(pixelToHex(gridLayout, new Point(player.position.x, player.position.y)));
            substate = play_waitingForInput;

        }

    }

}






//returns a sprite from a hex according to the type of the hex
function spawnHex(hexCoord) {
    let ret;

    switch (hexCoord.type) {
        case "white":
            ret = new Sprite(resources["images/hex_white.png"].texture);
            break;
        case "red":
            ret = new Sprite(resources["images/hex_red.png"].texture);
            break;
        case "blue":
            ret = new Sprite(resources["images/hex_blue.png"].texture);
            break;
        case "green":
            ret = new Sprite(resources["images/hex_green.png"].texture);
            break;
        case "yellow":
            ret = new Sprite(resources["images/hex_yellow.png"].texture);
            break;
        case "alpha":
            ret = new Sprite(resources["images/hex_alpha.png"].texture);
            break;
        default:
            ret = new Sprite(resources["images/hex_white.png"].texture);
            break;
    }

    ret.position.set(hexToPixel(gridLayout, hexCoord).x, hexToPixel(gridLayout, hexCoord).y);
    ret.anchor.set(0.5,0.5);
    return ret;
}


// Displays the grid for "level"
// arg : string with level file name
async function gridLoading(level) {

    grid = await parseGrid("scripts/grids/" + level);
    
    for (let i in grid) {
        for (let j = 0; j<grid[i].length; j++) {
            if (grid[i][j] != undefined) {
                grid[i][j] = {
                    hex : grid[i][j],
                    sprite : spawnHex(grid[i][j])
                }

                gridContainer.addChild(grid[i][j].sprite);
                
            }
        }
    }
}