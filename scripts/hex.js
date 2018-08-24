/////////////////
//hex functions//
/////////////////

function hex(x, y, type="white") {
    return { hx: x, hy: y, hz: -x-y, type: type};
}

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





function doubleToHex(col, row, type="white")
{
    var x = col;
    var y = (row - col) / 2;
    return hex(x, y, type);
}