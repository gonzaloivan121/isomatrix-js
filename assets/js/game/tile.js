class Tile {
    constructor(x, y, image_src = "./assets/img/tile.png") {
        this.position = new Vector(x, y);
        this.image = new Image();
        this.image.src = image_src;
    }

    update() {
        this.draw();
    }

    set_image(image_src) {
        this.image.src = image_src;
    }

    transform_isometric() {
        var position = {
            x: ((this.position.x * (0.50 * this.image.width))   + (this.position.y * (-0.50 * this.image.width)) - this.image.width * 0.5),
            y: ( this.position.x * (0.25 * this.image.height))  + (this.position.y * ( 0.25 * this.image.height))
        };
        position.x += canvas_width * 0.5;
        position.y += canvas_height / (grid_size * 0.25);

        return position;
    }

    draw() {
        var position = this.transform_isometric();
        
        context.drawImage(
            this.image,
            position.x,
            position.y
        );
    }

    moveTo(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    move(input) {
        this.position.x = this.lerp(this.position.x, this.position.x + input.x, 0.1);
        this.position.y = this.lerp(this.position.y, this.position.y + input.y, 0.1);
    }

    lerp(start, end, ammount) {
        return (1 - ammount) * start + ammount * end;
    }

    move_y(n) {
        var old_x = this.position.x;
        var old_y = this.position.y;
        var going_up = true;

        setInterval(() => {
            if (going_up) {
                this.position.x -= n;
                this.position.y -= n;
            } else {
                this.position.x += n;
                this.position.y += n;
            }

            if (this.position.x < (old_x - 1) && this.position.y < (old_y - 1)) {
                going_up = false;
            }

            if (this.position.x > (old_x + 1) && this.position.y > (old_y + 1)) {
                going_up = true;
            }
        }, 20);
    }
}