/////////////////
//hex functions//
/////////////////

// returns a new hex
function hex(x, y, type="white") {
    return { hx: x, hy: y, hz: -x-y, type: type};
}


// HEX OPERATIONS
// returns true if hex coordinates are equal
function hexEqual(hex1, hex2) {
    return hex1.hx == hex2.hx && hex1.hy == hex2.hy && hex1.hz == hex2.hz;
}

function hexAdd(hex1, hex2) {
    return hex(hex1.hx + hex2.hx, hex1.hy + hex2.hy);
}

function hexSubstract(hex1, hex2) {
    return hex(hex1.hx - hex2.hx, hex1.hy - hex2.hy);
}

function hexScale(hex, k) {
    return hex(hex.hx * k, hex.hy * k);
}


//NEIGHBORS
//directions, starting from the top then clockwise
let directions = [hex(0,-1), hex(+1, -1), hex(+1, 0), hex(0, +1), hex(-1, 1), hex(-1, 0)]; 

//returns one neighbor if dir is specified, array of neighbor if dir is left out
function hexNeighbor(h, dir=undefined) {
    if (dir === undefined) {
        let ret;
        for (let i in directions) {
            ret.push(hexAdd(h, directions[i]));
        }
        return ret;
    } else if (dir >= 0 && dir < 6) {
        return hexAdd(h, directions[dir]);
    } else {
        throw "dir must be between 0 (included) and 6 (excluded)";
    }
}



// returns distance between origin & h
function hexLength(h) {
    return (Math.abs(h.hx) + Math.abs(h.hy) + Math.abs(h.hz)) / 2;
}

// returns distance between hex1 & hex2 in hexes
function hexDistance(hex1, hex2) {
    return hexLength(hexSubstract(hex2, hex1));
}



// convert text file coordinates to hex
function doubleToHex(col, row, type="white")
{
    var x = col;
    var y = (row - col) / 2;
    return hex(x, y, type);
}


// rounds decimal hex values
function hexRound(h) {
    x = Math.round(h.hx);
    y = Math.round(h.hy);
    z = Math.round(h.hz);

    xd = x - h.hx;
    yd = y - h.hy;
    zd = z - h.hz;

    if (xd < yd && xd < zd) {
        x = -y - z;
    } else if (yd < zd) {
        y = -x - z;
    } else {
        z = -x - y;
    }

    return hex(x, y);
}