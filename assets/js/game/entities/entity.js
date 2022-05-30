class Entity extends Tile {
    constructor(x, y, image_src) {
        super(x, y, image_src);
    }

    move(position) {
        if (this.position.x < -1.5) {
            this.position.x = -1.5;
        } else if (this.position.x > grid_size - 2.5) {
            this.position.x = grid_size - 2.5;
        } else if (this.position.y < -1.5) {
            this.position.y = -1.5;
        } else if (this.position.y > grid_size - 2.5) {
            this.position.y = grid_size - 2.5;
        } else {
            this.position.sum(position);
        }
    }
}