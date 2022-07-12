/**
 * Some useful utilities
 */
class Utilities {
    /**
     * Transforms a 2D cartesian coordinate Vector to an isometric coordinate Vector.
     * 
     * @param {Vector} position - The 2D cartesian coordinate Vector to be transformed
     * @returns {Vector} The calculated isometric coordinate Vector
     */
    static transform_isometric(position = null) {
        if (position === null) return;
        var a = ( 0.50 * image_size);
        var b = (-0.50 * image_size);
        var c = ( 0.25 * image_size);
        var d = ( 0.25 * image_size);

        var isometric = new Vector(
            ((position.x * a) + (position.y * b) - image_size * 0.5),
            ( position.x * c) + (position.y * d)
        );

        isometric.x += canvas_width * 0.5;
        isometric.y += canvas_height * 0.5 - grid_size * 8;

        return isometric;
    }

    /**
     * Generates a random integer from a given minimum and maximum. Both included.
     * 
     * @param {Number} min - The minimum generated number
     * @param {Number} max - The maximum generated number
     * @returns {Number} The randomly generated integer
     */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Maps a number from a range to another given range
     * 
     * @param {Number} n - The number to be mapped
     * @param {Number} min1 - The number's original minimum range
     * @param {Number} max1 - The number's original maximum range
     * @param {Number} min2 - The number's mapped minimum range
     * @param {Number} max2 - The number's mapped maximum range
     * @returns {Number} The mapped number
     */
    static map(n, min1, max1, min2, max2) {
        return min2 + (max2 - min2) * ((n - min1) / (max1 - min1));
    }

    /**
     * Loads a JSON file from a given path. It can be an URL or a filesystem path
     * 
     * @param {String} path - The path of the json to be loaded
     * @param {Function} callback - The function to be called once the JSON is loaded
     * @param {Function} callback_error - The function to be called if the load fails
     */
    static load_json(path = null, callback, callback_error = () => {}) {
        if (path === null) return;

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);
            }
        }
        xobj.onerror = function () {
            callback_error("Ha ocurrido un error.");
        }
        xobj.send(null);
    }

    /**
     * Returns the environment that the game is running on
     * 
     * @returns {String} The game environment
     */
    static get_environment() {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            return 'local';
        }

        if (window.location.hostname.includes("dev-")) {
            return 'development';
        }

        if (window.location.hostname.includes("uat-")) {
            return 'testing';
        }

        return 'production';
    }

    /**
     * https://github.com/Miziziziz/GodotBreadthFirstSearch/blob/master/BaseCode.gd
     * 
     * @param {Vector} start_pos - Starting position for the algorithm
     * @param {Vector} goal_pos - Goal position for the algorithm
     * @param {Number} max_iterations - Maximum numbers of iterations so the algorithm won't run forever
     */
    static breadth_first_search(start_pos, goal_pos, max_iterations = 1000) {
        var queue = [];
        var visited = [];

        queue.push({
            pos: start_pos,
            last_pos: null
        });

        var iterations = 0;

        while (queue.length > 0) {
            var cell_info = queue.shift();

            if (this.check_cell(cell_info.pos, cell_info.last_pos, goal_pos, visited, queue)) {
                break;
            }

            iterations++;

            if (iterations >= max_iterations) {
                return [];
            }
        }

        var backtraced_path = [];
        var curr_pos = new Vector(goal_pos.x, goal_pos.y);

        var i = visited.findIndex(pos => pos.x === curr_pos.x && pos.y === curr_pos.y);
        var is_visited = visited.some(pos => pos.x === curr_pos.x && pos.y === curr_pos.y);

        while (is_visited && (visited[i] !== null || visited[i] !== undefined)) {
            if (curr_pos !== null || curr_pos !== undefined) {
                backtraced_path.push(new Vector(curr_pos.x, curr_pos.y));
            }
            curr_pos = new Vector(visited[i].x, visited[i].y);
            i = visited.findIndex(pos => pos.x === curr_pos.x && pos.y === curr_pos.y);
            is_visited = visited.some(pos => pos.x === curr_pos.x && pos.y === curr_pos.y);
        }

        backtraced_path = backtraced_path.reverse();

        return backtraced_path;
    }

    /**
     * 
     * @param {*} curr_pos 
     * @param {*} last_pos 
     * @param {*} goal_pos 
     * @param {*} visited 
     * @param {*} queue 
     * @returns 
     */
    static check_cell(curr_pos, last_pos, goal_pos, visited, queue) {
        if (visited.some(pos => pos.x === curr_pos.x && pos.y === curr_pos.y)) {
            return false;
        }

        if (last_pos !== null) {
            visited.push(new Vector(last_pos.x, last_pos.y));
        }

        console.log(curr_pos)

        if (curr_pos.x === goal_pos.x && curr_pos.y === goal_pos.y) {
            return true;
        }

        queue.push({
            pos: new Vector(curr_pos.x, curr_pos.y + 1),
            last_pos: new Vector(curr_pos.x, curr_pos.y)
        });
        queue.push({
            pos: new Vector(curr_pos.x + 1, curr_pos.y),
            last_pos: new Vector(curr_pos.x, curr_pos.y)
        });
        queue.push({
            pos: new Vector(curr_pos.x, curr_pos.y - 1),
            last_pos: new Vector(curr_pos.x, curr_pos.y)
        });
        queue.push({
            pos: new Vector(curr_pos.x - 1, curr_pos.y),
            last_pos: new Vector(curr_pos.x, curr_pos.y)
        });

        return false;
    }
}