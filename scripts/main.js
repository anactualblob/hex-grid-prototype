/*let grid = [
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
]*/

let state;
let level = "level.txt";

//GAMELOOP & STATES
function GameLoop (delta) {
    state(delta);
}

function play (delta) {

}


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