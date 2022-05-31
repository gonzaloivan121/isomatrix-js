class Player extends Entity {
    constructor(x, y, stats = new Stats()) {
        super(x, y, "./assets/img/entities/player.png");
        this.stats = stats;
    }
}