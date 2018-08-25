/////////////////
//hex functions//
/////////////////

// returns a new hex
function hex(x, y, type="white") {
    return { hx: x, hy: y, hz: -x-y, type: type};
}


// hex operations
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

    if (xd > yd && xd > zd) {
        x = -y - z;
    } else if (yd > zd) {
        y = -x - z;
    } else {
        z = -x - y;
    }

    return hex(x, y);
}