const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
var canvas_width = canvas.clientWidth;
var canvas_height = canvas.clientHeight;
var grid_size = 32;
var grid_height = 4;
var image_size = 32;

var UPS = 60;
var Interval = 1000 / UPS;
var IntervalID;

var grid = [];

var input = new Vector();

start_game();

var player = new Player(
    Math.floor(grid_size * 0.5) - 4,
    Math.floor(grid_size * 0.5) - 4
);

document.addEventListener('keydown', function (event) {
    if (event.repeat) return;

    const key = event.key.toUpperCase();

    switch (key) {
        case Input.up:
            input.x += -player.movement_speed;
            input.y += -player.movement_speed;
            break;
        case Input.down:
            input.x += player.movement_speed;
            input.y += player.movement_speed;
            break;
        case Input.left:
            input.x += -player.movement_speed;
            input.y +=  player.movement_speed;
            break;
        case Input.right:
            input.x +=  player.movement_speed;
            input.y += -player.movement_speed;
            break;
        case Input.run:
            player.movement_speed = 2;
            break;
        case Input.dance:
            dance_tiles();
            break;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.repeat) return;

    const key = event.key.toUpperCase();
    if (Input.any(key)) {
        input = new Vector();
    }

    if (key === Input.run) {
        player.movement_speed = 1;
    }
});

canvas.onmousemove = function (e) {
    // important: correct mouse position:
    var rect = this.getBoundingClientRect(),
        screen_x = Math.floor(e.clientX - rect.left),
        screen_y = Math.floor(e.clientY - rect.top);

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            for (var z = 0; z < grid[x][y].length; z++) {
                var tile = grid[x][y][z];
                if (
                    screen_x >= tile.isometric_position.x && screen_x <= tile.isometric_position.x + image_size * 0.5 &&
                    screen_y >= tile.isometric_position.y && screen_y <= tile.isometric_position.y + image_size * 0.5
                ) {
                    tile.set_selected(true);
                } else {
                    tile.set_selected(false);
                }
            }
        }
    }
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
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            for (var z = 0; z < grid[x][y].length; z++) {
                callback(grid[x][y][z]);
            }
        }
    }
}

function action_on_all_tiles_from_z(z, callback) {
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            callback(grid[x][y][z]);
        }
    }
}

function update_tiles() {
    if (grid.length != 0) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                for (var z = 0; z < grid[x][y].length; z++) {
                    var tile = grid[x][y][z];
                    tile.update();
                }
            }
        }
    }
}

function update_player() {
    if (player !== undefined) {
        player.update();
        player.move(input);
    }
}

async function dance_tiles() {
    if (grid.length != 0) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                for (var z = 0; z < grid[x][y].length; z++) {
                    var tile = grid[x][y][z];
                    await task(tile);
                }
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
            grid[x][y] = [];
            for (var z = 0; z < grid_height; z++) {
                if (z === 0) {
                    // First layer is grass
                    grid[x][y][z] = new Grass(x + z, y + z);
                } else if (z > 0 && z <= 2) {
                    // Second and third layers are random between dirt and stone
                    var r = Utilities.random(0,1);

                    if (r === 0) {
                        grid[x][y][z] = new Dirt(x + z, y + z);
                    } else {
                        grid[x][y][z] = new Stone(x + z, y + z);
                    }

                } else if (z > 2 && z < grid_height - 1) {
                    // The rest is stone
                    grid[x][y][z] = new Stone(x + z, y + z);
                } else {
                    // The rest is stone
                    grid[x][y][z] = new Bedrock(x + z, y + z);
                }
            }
        }
    }
    if (IntervalID === undefined) {
        start_interval(Interval);
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas_width = canvas.clientWidth;
    canvas_height = canvas.clientHeight;
}
resize();
window.addEventListener("resize", resize);