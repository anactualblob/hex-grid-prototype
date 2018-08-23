///////////////////
//// HEX CLASS ////
///////////////////
class hex {
    constructor(x, y, line="white") {
        this.hx = x;
        this.hy = y;
        this.hz = -this.hx - this.hy;

        switch (line) {
            case "blue":
                this.color = 0x0000ff;
                break;
            case "red":
                this.color = 0xff0000;
                break;
            case "green":
                this.color = 0x00ff00;
                break;
            case "yellow":
                this.color = 0xffff00;
                break;
            case "white":
                this.color = 0xffffff;
                break;
            default:
                this.color = 0xffffff;
                console.log("you passed : " + line + "----" + " bad color, defaulting to white");
        }

    }
    // Hex equality declaration
    // syntax : hex1.equals(hex2)
    equals(other) {
        return this.hx == other.hx && this.hy == other.hy && this.hz == other.hz;
    }


    // Hex operations declarations
    // syntax : hexResult = hex1.operation(hex2);
    add(other) {
        return new hex(this.hx + other.hx, this.hy + other.hy, this.hz + other.hz);
    }

    substract(other) {
        return new hex(this.hx - other.hx, this.hy - other.hy, this.hz - other.hz);
    }

    multiply(nb) {
        return new hex(this.hx * nb, this.hy * nb, this.hz * nb);
    }


    // Distance & length operations
    length (hex) {
        return (Math.abs(hex.hx) + Math.abs(hex.hy) + Math.abs(hex.hz)) / 2;
    }

    distance (hex1, hex2) {
        return length(hex1.substract(hex2));
    }

    // Drawing the hex tile
    draw (layout) {
        
        let hexCorners = layout.Corners(this);

        let graphics = new PIXI.Graphics();
        graphics.lineStyle(2, this.color, 1, 1);
        graphics.moveTo(hexCorners[0].x, hexCorners[0].y);

        for (let i = 0; i < hexCorners.length; i++) {
            if (i<5) {
                graphics.lineTo(hexCorners[i+1].x, hexCorners[i+1].y);
            } else {
                graphics.lineTo(hexCorners[0].x, hexCorners[0].y);
            }
        }
        return graphics;
    }

    // Rounding decimal hex values
    round() {
        var xi = Math.round(this.hx);
        var yi = Math.round(this.hy);
        var zi = Math.round(this.hz);
        var x_diff = Math.abs(xi - this.hx);
        var y_diff = Math.abs(yi - this.hy);
        var z_diff = Math.abs(zi - this.hz);
        if (x_diff > y_diff && x_diff > z_diff) {
            xi = -yi - zi;
        }
        else if (y_diff > z_diff) {
            yi = -xi - zi;
        }
        else {
            zi = -xi - yi;
        }
        return new hex(xi, yi);
    }
}

// This whole part is lifted more or less verbatum from https://www.redblobgames.com/grids/hexagons/implementation.html

// TODO : Do I need all of this if I only want one orientation ?

// Orientation helper class
// uses 2 2x2 matrices to define the hex orientation
class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
                      // values for flat orientation :
        this.f0 = f0; // 3/2
        this.f1 = f1; // 0
        this.f2 = f2; // Math.sqrt(3)/2
        this.f3 = f3; // Math.sqrt(3)
        this.b0 = b0; // 2/3
        this.b1 = b1; // 0
        this.b2 = b2; // -1/3
        this.b3 = b3; // Math.sqrt(3)/3
        this.start_angle = start_angle; // 0
    }
}

// LAYOUT CLASS
// defines the orientation of hexes, the size of the layout and the grid origin on the screen
class Layout {
    constructor(orientation, v2Size, v2Origin) {
        this.orientation = orientation;
        this.size = v2Size;
        this.origin = v2Origin;
    }


    hexToPixel(hex) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var x = (M.f0 * hex.hx + M.f1 * hex.hy) * size.x;
        var y = (M.f2 * hex.hx + M.f3 * hex.hy) * size.y;
        return new vector2(x + origin.x, y + origin.y);
    }

    pixelToHex(pos) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var pt = new vector2((pos.x - origin.x) / size.x, (pos.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return new hex(q, r);
    }


    hexCornerOffset(corner) {
        var M = this.orientation;
        var size = this.size;
        var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6;
        return new vector2(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }

    Corners(hex) {
        var corners = [];
        var center = this.hexToPixel(hex);
        for (var i = 0; i < 6; i++) {
            var offset = this.hexCornerOffset(i);
            corners.push(new vector2(center.x + offset.x, center.y + offset.y));
        }
        return corners; 
    }

}
//pointy and flat orientation definitions, beacause JS won't let me put them in the Layout class for some reason ¯\_(ツ)_/¯
Layout.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
Layout.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);


// Simple 2D vector class
class vector2 {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}