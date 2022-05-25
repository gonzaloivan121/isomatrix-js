class Entity extends Tile {
    constructor(x, y, image_src) {
        super(x, y, image_src);
    }

    move(input) {
        this.position.x = this.lerp(this.position.x, this.position.x + input.x, 0.1);
        this.position.y = this.lerp(this.position.y, this.position.y + input.y, 0.1);
    }

    lerp(start, end, ammount) {
        return (1 - ammount) * start + ammount * end;
    }
}