class Enemy extends Entity {
    experience_to_give = 4;

    constructor(x, y, stats = new Stats()) {
        super(x, y, "./assets/img/entities/enemy.png");
        this.stats = stats;
    }
}