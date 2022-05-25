class Utilities {
    static transform_screen_isometric(position) {
        var a = ( 0.50 * 32);
        var b = (-0.50 * 32);
        var c = ( 0.25 * 32);
        var d = ( 0.25 * 32);

        var new_a =  d;
        var new_b = -b;
        var new_c = -c;
        var new_d =  a;

        var isometric = {
            x: ((position.x * new_a) + (position.y * new_b) - 32 * 0.5),
            y: ( position.x * new_c) + (position.y * new_d)
        };

        isometric.x -= canvas_width * 0.5;
        isometric.y -= canvas_height * 0.5 - grid_size * 8;

        return isometric;
    }

    static screen_to_grid(position) {
        
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}