class Entity extends Tile {
    stats = new Stats();
    alive = true;

    constructor(x, y, image_src) {
        super(x, y, image_src);
    }

    fight(entity) {
        var damage = Utilities.calculate_damage(this.stats, entity.stats);
        entity.stats.decrease_health(damage);

        if (entity.stats.health === 0) {
            this.stats.gain_experience(entity.experience_to_give);
            entity.die();
        }
    }

    die() {
        this.alive = false;
    }

    move_to(x, y) {
        this.position.x = x;
        this.position.y = y;
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