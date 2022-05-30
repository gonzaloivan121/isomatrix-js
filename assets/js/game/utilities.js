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

    static calculate_damage(a, b) {
        var damage = a.attack;
        if (this.random(0, 100) >= a.critical_chance) {
            damage *= a.critical_multiplier;
        }
        damage -= b.defence;
        return damage;
    }
}