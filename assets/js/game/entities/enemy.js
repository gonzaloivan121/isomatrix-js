class Enemy extends Entity {
    experience_to_give = 4;

    constructor(x, y, stats = new Stats()) {
        super(x, y, "./assets/img/entities/enemy.png");
        this.stats = stats;
        this.experience_to_give = Utilities.random(1, 10);
    }

    set_experience(experience) {
        this.experience_to_give = experience;
    }

    check_turn(entity) {
        if (this.has_turn && this.is_alive) {
            
        }
    }
}