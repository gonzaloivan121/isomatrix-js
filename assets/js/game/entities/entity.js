class Entity extends Tile {
    alive = true;
    has_turn = false;

    constructor(x, y, image_src, stats = new Stats()) {
        super(x, y, image_src);
        this.stats = stats;
    }

    fight(enemy) {
        if (!this.has_turn) return;
        var damage = this.calculate_damage(enemy);

        if (damage === false) {
            return false;
        }

        enemy.stats.decrease_health(damage);

        if (enemy.stats.health === 0) {
            this.stats.gain_experience(enemy.experience_to_give);
            enemy.die();
        }

        return damage;
    }

    die() {
        this.alive = false;
    }

    calculate_damage(enemy) {
        // Draw random number for block chance
        if (Utilities.random(0, 100) <= enemy.stats.block_chance) {
            return false;
        }

        // If attack is lower than defence, block the attack
        if (this.stats.attack < enemy.stats.defence) {
            return false;
        }

        var damage = this.stats.attack;

        // Draw random number for critical chance
        if (Utilities.random(0, 100) <= this.stats.critical_chance) {
            damage *= this.stats.critical_multiplier;
        }

        damage -= enemy.stats.defence;

        return damage;
    }

    move_to(x, y) {
        if (!this.has_turn) return;
        this.position.x = x;
        this.position.y = y;
    }

    move(position) {
        if (!this.has_turn) return;
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