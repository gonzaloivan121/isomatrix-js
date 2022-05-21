class Utilities {
    static transform_screen_isometric(position) {
        var a = ( 0.50 * grid_size);
        var b = (-0.50 * grid_size);
        var c = ( 0.25 * grid_size);
        var d = ( 0.25 * grid_size);

        var new_a =  d;
        var new_b = -b;
        var new_c = -c;
        var new_d =  a;

        var isometric = {
            x: ((position.x * new_a) + (position.y * new_b) - grid_size * 0.5),
            y: ( position.x * new_c) + (position.y * new_d)
        };

        isometric.x -= canvas_width * 0.5;
        isometric.y -= canvas_height / (grid_size * 0.25);

        return isometric;
    }

    static screen_to_grid(position) {
        
    }
}