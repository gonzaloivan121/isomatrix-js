class Player extends Entity {
    movement_speed = 1;

    constructor(x, y) {
        super(x, y, "./assets/img/player.png");
    }

    move(position) {
        if (
            this.position.x > -1.5 &&
            this.position.x < grid_size - 2.5 &&
            this.position.y > -1.5 &&
            this.position.y < grid_size - 2.5
        ) {
            this.position.sum(position);
        } else {
            console.log(this.position)
        }
    }
}