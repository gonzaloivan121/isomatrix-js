const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
var canvas_width = context.canvas.clientWidth;
var canvas_height = context.canvas.clientHeight;
var grid_size = 32;

var UPS = 60;
var Interval = 1000 / UPS;
var IntervalID;

var grid = [];

start_game();

var player = new Player(
    Math.floor(grid_size * 0.5),
    Math.floor(grid_size * 0.5),
    "./assets/img/player.png"
);

document.addEventListener('keydown', function (event) {
    var movement_speed = 1;
    var input = new Vector();

    if (event.key == "w" || event.key == "W") {
        input.x = -movement_speed;
        input.y = -movement_speed;
    } else if (event.key == "a" || event.key == "A") {
        input.x = -movement_speed;
        input.y =  movement_speed;
    } else if (event.key == "s" || event.key == "S") {
        input.x = movement_speed;
        input.y = movement_speed;
    } else if (event.key == "d" || event.key == "D") {
        input.x =  movement_speed;
        input.y = -movement_speed;
    } else {
        input = new Vector();
    }

    setInterval(() => {
        player.move(input);
    }, 1000/60);
});

canvas.onmousemove = function (e) {
    // important: correct mouse position:
    var rect = this.getBoundingClientRect(),
        x = Math.floor((e.clientX - rect.left) / grid_size),
        y = Math.floor((e.clientY - rect.top) / grid_size);

    var position = Utilities.transform_screen_isometric({x: x, y: y});
    console.log(position)
    //var tile = grid[position.x][position.y];
};

// GAME LOOP
function start_interval(time) {
    IntervalID = setInterval(() => {
        draw_background();
        update_tiles();
        update_player();
    }, time);
}

function update_UPS(val) {
    UPS = parseInt(val);
    Interval = 1000 / UPS;
    clearInterval(IntervalID);
    start_interval(Interval);
}

function draw_background() {
    context.fillStyle = "#9b54ff";
    context.fillRect(0, 0, canvas_width, canvas_height);
}

function action_on_all_tiles(callback) {
    for (var x = 0; x < grid_size; x++) {
        for (var y = 0; y < grid_size; y++) {
            callback(grid[x][y]);
        }
    }
}

function update_tiles() {
    if (grid.length != 0) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                var tile = grid[x][y];
                tile.update();
            }
        }
    }
}

function update_player() {
    if (player !== undefined) {
        player.update();
    }
}

async function dance_tiles() {
    if (grid.length != 0) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                var tile = grid[x][y];
                await task(tile);
            }
        }
    }
}

async function task(tile) {
    await timer(0);
    tile.move_y(1 / UPS);
}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

function start_game() {
    for (var x = 0; x < grid_size; x++) {
        grid[x] = [];
        for (var y = 0; y < grid_size; y++) {
            grid[x][y] = new Tile(x, y);
        }
    }
    if (IntervalID === undefined) {
        start_interval(Interval);
    }
}