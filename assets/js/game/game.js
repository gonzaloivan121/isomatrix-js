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

var player = new Player(0.5, 0.5, new Stats(
    10, // Atack
    5,  // Defence
    10, // Critical Chance
    2,  // Critical Multiplier
    5,  // Block Chance
    1   // Action Area
));
player.has_turn = true;

var enemies = [];
var enemy;

function generate_enemies() {
    for (var i = 0; i <= Utilities.random(1, 10); i++) {
        enemies.push(
            new Enemy(
                Utilities.random(-1, grid_size - 2) - 0.5,
                Utilities.random(-1, grid_size - 2) - 0.5,
                new Stats(
                    Utilities.random(1, 10), // Atack
                    Utilities.random(1, 5),  // Defence
                    Utilities.random(1, 10), // Critical Chance
                    Utilities.random(1, 3),  // Critical Multiplier
                    Utilities.random(1, 10), // Block Chance
                    Utilities.random(1, 3)   // Action Area
                )
            )
        );
    }

    enemy = enemies[Utilities.random(0, enemies.length - 1)];
}

generate_enemies();
start_game();

document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();
    move_player(key);
});

function move_player(key = null) {
    switch (key) {
        case Input.up:
            player.move(Vector.up);
            break;
        case Input.down:
            player.move(Vector.down);
            break;
        case Input.left:
            player.move(Vector.left);
            break;
        case Input.right:
            player.move(Vector.right);
            break;
    }
}

canvas.onmousemove = function (e) {
    var rect = this.getBoundingClientRect(),
        screen_x = Math.floor(e.clientX - rect.left),
        screen_y = Math.floor(e.clientY - rect.top);

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            for (var z = 0; z < grid[x][y].length; z++) {
                var tile = grid[x][y][z];
                if (
                    screen_x >= tile.isometric_position.x && screen_x <= tile.isometric_position.x + image_size * 0.5 &&
                    screen_y >= tile.isometric_position.y && screen_y <= tile.isometric_position.y + image_size * 0.5 &&
                    z === 0
                ) {
                    tile.hover(true);
                } else {
                    tile.hover(false);
                }
            }
        }
    }
};

canvas.onmousedown = function (e) {
    var rect = this.getBoundingClientRect(),
        screen_x = Math.floor(e.clientX - rect.left),
        screen_y = Math.floor(e.clientY - rect.top);

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            for (var z = 0; z < grid[x][y].length; z++) {
                var tile = grid[x][y][z];
                if (
                    screen_x >= tile.isometric_position.x && screen_x <= tile.isometric_position.x + image_size * 0.5 &&
                    screen_y >= tile.isometric_position.y && screen_y <= tile.isometric_position.y + image_size * 0.5 &&
                    z === 0
                ) {
                    check_action_area(x, y);
                }
            }
        }
    }
}

function check_action_area(x, y) {
    if (
        x - 1.5 <= player.position.x + player.stats.action_area &&
        y - 1.5 <= player.position.y + player.stats.action_area &&
        x - 0.5 > player.position.x - player.stats.action_area &&
        y - 0.5 > player.position.y - player.stats.action_area
    ) {
        if (enemy.position.x === x - 1.5 && enemy.position.y === y - 1.5 && enemy.alive) {
            var attack_result = player.fight(enemy);
            if (!attack_result) {
                alert("Attack blocked!");
            } else {
                update_health_bar("enemy", attack_result);
                update_experience_bar(player.stats);
            }
        } else {
            player.move_to(x - 1.5, y - 1.5);
        }
    } else {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].position.x === x - 1.5 && enemies[i].position.y === y - 1.5) {
                enemy = enemies[i];
                update_health_bar("enemy", 0);
            }
        }
    }
}

function update_experience_bar(stats = null) {
    if (stats === null) return;
    var hit = document.getElementById("player-expbar-hit");
    var bar_width = (stats.experience / stats.experience_to_level_up) * 100;
    hit.style.width = (100 - bar_width) + "%";
}

function update_health_bar(type = null, damage = null) {
    if (type === null || damage === null) return;

    var stats = null;

    switch (type) {
        case "player":
            stats = player.stats;
            break;
        case "enemy":
            stats = enemy.stats;
            break;
    }

    if (stats === null) return;

    var bar = document.getElementById(type + "-healthbar-bar");
    var hit = document.getElementById(type + "-healthbar-hit");

    var bar_width = (stats.health / stats.max_health) * 100 + "%";
    var hit_width = (damage / (stats.health + damage)) * 100 + "%";

    hit.style.width = hit_width;

    setTimeout(() => {
        hit.style.width = "0";
        bar.style.width = bar_width;
    }, 500);
}

function reset_health_bar(type = null) {
    if (type === null) return;

    var bar = document.getElementById(type + "-healthbar-bar");
    var hit = document.getElementById(type + "-healthbar-hit");

    hit.style.width = "0";
    bar.style.width = "100%";
}

function revive(type = null, random_position = false) {
    if (type === null) return;
    var revived = false;
    switch (type) {
        case "player":
            revived = player.revive(random_position);
            break;
        case "enemy":
            revived = enemy.revive(random_position);
            break;
        default:
            return;
    }
    if (revived) {
        reset_health_bar(type);
    }
}

// GAME LOOP
function start_interval(time) {
    IntervalID = setInterval(() => {
        draw_background();
        update_tiles();
        update_enemies();
        if (player.alive) {
            update_player();
        }
        update_ui();
    }, time);
}

function draw_background() {
    var gradient = context.createLinearGradient(0, 0, 0, canvas_height);
    gradient.addColorStop(0, "#7a33f1");
    gradient.addColorStop(1, "#72fdff");
    context.fillStyle = gradient;
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

function update_tiles() {
    if (grid.length != 0) {
        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                for (var z = 0; z < grid[x][y].length; z++) {
                    var tile = grid[x][y][z];
                    if (
                        tile.position.x - 1.5 <= player.position.x + player.stats.action_area &&
                        tile.position.y - 1.5 <= player.position.y + player.stats.action_area &&
                        tile.position.x - 0.5 > player.position.x - player.stats.action_area &&
                        tile.position.y - 0.5 > player.position.y - player.stats.action_area
                    ) {
                        tile.set_selected(true);
                    } else {
                        tile.set_selected(false);
                    }
                    tile.update();
                }
            }
        }
    }
}

function update_player() {
    if (player !== undefined) {
        player.update();
    }
}

function update_enemies() {
    if (enemies.length !== 0) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].alive) {
                enemies[i].update();
            }
        }
    }
}

function update_ui() {
    if (player !== undefined) {
        for (const stat in player.stats) {
            if (Object.hasOwnProperty.call(player.stats, stat)) {
                var stat_value_div = document.getElementById("player-" + stat);
                if (stat_value_div.innerText != player.stats[stat]) {
                    stat_value_div.innerText = player.stats[stat];
                }
            }
        }
    }

    if (enemy !== undefined) {
        for (const stat in enemy.stats) {
            if (Object.hasOwnProperty.call(enemy.stats, stat)) {
                var stat_value_div = document.getElementById("enemy-" + stat);
                if (stat_value_div.innerText != enemy.stats[stat]) {
                    stat_value_div.innerText = enemy.stats[stat];
                }
            }
        }
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
                    // The rest is stone until last
                    grid[x][y][z] = new Stone(x + z, y + z);
                } else {
                    // The last stack is bedrock
                    grid[x][y][z] = new Bedrock(x + z, y + z);
                }
            }
        }
    }

    generate_ui();

    if (IntervalID === undefined) {
        start_interval(Interval);
    }
}

function generate_ui() {
    generate_stats_ui("player");
    generate_stats_ui("enemy");
}

function generate_stats_ui(type = null) {
    if (type === null) return;

    var stats = null;

    switch (type) {
        case "player":
            stats = player.stats;
            break;
        case "enemy":
            stats = enemy.stats;
            break;
    }

    if (stats === null) return;

    var stats_container = document.getElementById(type + "-stats");

    for (const stat in stats) {
        if (Object.hasOwnProperty.call(stats, stat)) {
            var stat_div = document.createElement("div");
            stat_div.classList.add("stat");

            var stat_name_div = document.createElement("div");
            stat_name_div.classList.add("stat-name");

            var stat_name_arr = stat.split("_");
            var stat_name = "";

            stat_name_arr.forEach(word => {
                stat_name += word + " ";
            });

            stat_name_div.innerText = stat_name;

            var stat_value_div = document.createElement("div");
            stat_value_div.classList.add("stat-value");
            stat_value_div.id = type + "-" + stat;
            stat_value_div.innerText = stats[stat];

            stat_div.appendChild(stat_name_div);
            stat_div.appendChild(stat_value_div);
            stats_container.appendChild(stat_div);
        }
    }
}

function resize() {
    canvas.width = window.innerWidth - window.innerWidth * 0.30;
    canvas.height = window.innerHeight;
    canvas_width = canvas.clientWidth;
    canvas_height = canvas.clientHeight;
}
resize();
window.addEventListener("resize", resize);