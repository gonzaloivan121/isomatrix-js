class Utilities {
    static transform_isometric(position) {
        var a = ( 0.50 * image_size);
        var b = (-0.50 * image_size);
        var c = ( 0.25 * image_size);
        var d = ( 0.25 * image_size);

        var isometric = {
            x: ((position.x * a) + (position.y * b) - image_size * 0.5),
            y: ( position.x * c) + (position.y * d)
        };

        isometric.x += canvas_width * 0.5;
        isometric.y += canvas_height * 0.5 - grid_size * 8;

        return isometric;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

   static map(n, min1, max1, min2, max2) {
       return min2 + (max2 - min2) * ((n - min1) / (max1 - min1));
    }

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