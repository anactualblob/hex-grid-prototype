////////////////////
//layout functions//
////////////////////

function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    return {f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle};
}
let pointy = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
let flat = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);


function Layout(orientation, size, origin) {
    return {orientation: orientation, size: size, origin: origin};
}

function pixelToHex(layout, p)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return hex(q, r);
}

function hexToPixel(layout, h)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var x = (M.f0 * h.hx + M.f1 * h.hy) * size.x;
    var y = (M.f2 * h.hx + M.f3 * h.hy) * size.y;
    return new Point(x + origin.x, y + origin.y);
}



//////////////////
//grid functions//
//////////////////

async function parseGrid (url) {
    let str = await fetch(url).then( r => r.text());
    let grid = [];
    
    // getting array of strings from linebreaks
    grid = str.split("\n");

    // turning each string into an array of characters
    for (let i in grid) {
        grid[i] = grid[i].split("");
    }

    // replaces characters by hexes or undefined
    for (let i in grid) {
        for (let j = 0; j<grid[i].length; j++) {

            switch (grid[i][j]) {

                case "0":
                    grid[i][j] = doubleToHex(j, i);
                    break;

                case "r":
                    grid[i][j] = doubleToHex(j, i, "red");
                    break;
                
                case "b":
                    grid[i][j] = doubleToHex(j, i, "blue");
                    break;
                
                case "g":
                    grid[i][j] = doubleToHex(j, i, "green");
                    break;

                default:
                    grid[i][j] = undefined;

            }
        }
    }
    return grid;
}