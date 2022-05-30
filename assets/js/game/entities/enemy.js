class Enemy extends Entity {
    experience_to_give = 1;

    constructor(x, y) {
        super(x, y, "./assets/img/entities/enemy.png");
    }
}