function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}


function Shape(angles, r) {
    this.x = 0;
    this.y = 0;
    this.angles = angles;
    this.r = r;
    this.coordinates = [];
}

Object.assign(Shape.prototype, {
    calcCoordinates: function () {
        this.coordinates = [];

        for (var i = 0; i < this.angles; i++) {
            this.coordinates.push([
                this.x + this.r * Math.cos(i * 2 * Math.PI / this.angles),
                this.y  + this.r * Math.sin(i * 2 * Math.PI / this.angles)
            ]);
        }

        return this;
    },
    getCoordinates: function () {
        return this.coordinates;
    },
    moveTo: function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    },
    moveRand: function() {
        this.x = this.x + randomInteger(-2, +2);
        this.y = this.y + randomInteger(-2, +2);

        if (this.x - this.r < 0) {
            this.x = this.r;
        }
        if (this.y - this.r < 0) {
            this.y = this.r;
        }

        if (this.x + this.r > c.width) {
            this.x = c.width - this.r;
        }
        if (this.y + this.r > c.height) {
            this.y = c.height - this.r;
        }

        return this;
    },
    rotate: function(angle) {
        var cords = this.coordinates;
        this.coordinates = [];
        for (var i = 0; i < cords.length; i++) {
            this.coordinates.push([
                (cords[i][0] - this.x) * Math.cos(angle) - (cords[i][1] - this.y) * Math.sin(angle) + this.x,
                (cords[i][0] - this.x) * Math.sin(angle) + (cords[i][1] - this.y) * Math.cos(angle) + this.y
            ]);
        }

        return this;
    }
});

var c = document.getElementById("canv");
var ctx = c.getContext("2d");

function drawShape(shape) {
    var coords = shape.getCoordinates();
    ctx.beginPath();
    for (var i = 0; i < coords.length; i++) {
        if (i == 0) {
            ctx.moveTo(coords[i][0], coords[i][1]);
        } else {
            ctx.lineTo(coords[i][0], coords[i][1]);
        }
    }
    ctx.fillStyle = "rgb(255,128,128)";
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();
}

var dgr = 0;
var shape = new Shape(6, 20);

shape.moveTo(c.width/2, c.height/2).calcCoordinates();
drawShape(shape);


function act() {

    shape.moveRand().calcCoordinates().rotate(dgr);
    ctx.clearRect(0, 0, c.width, c.height);

    drawShape(shape);

    dgr = (dgr + 20) % 360;

    setTimeout(function() {
        window.requestAnimationFrame(act);
    }, 100);
}

act();