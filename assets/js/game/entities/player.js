class Player extends Entity {
    inventory = new Inventory();

    constructor(x, y, stats = new Stats()) {
        super(x, y, "./assets/img/entities/player.png");
        this.stats = stats;
    }
}