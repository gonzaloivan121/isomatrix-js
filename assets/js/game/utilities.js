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
     */
    static load_json(path = null, callback) {
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
        xobj.send(null);
    }
}