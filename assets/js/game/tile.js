class Tile {
    constructor(x, y, image_src = "./assets/img/tile.png") {
        this.position = new Vector(x, y);
        this.image = new Image();
        this.image.src = image_src;
        this.image.height = image_size;
        this.image.width = image_size;
    }

    update() {
        this.set_image_size();
        this.draw();
    }

    set_image_size() {
        this.image.height = image_size;
        this.image.width = image_size;
    }

    set_image(image_src) {
        this.image.src = image_src;
    }

    transform_isometric() {
        var a = ( 0.50 * image_size);
        var b = (-0.50 * image_size);
        var c = ( 0.25 * image_size);
        var d = ( 0.25 * image_size);

        var position = {
            x: ((this.position.x * a) + (this.position.y * b) - image_size * 0.5),
            y: ( this.position.x * c) + (this.position.y * d)
        };

        position.x += canvas_width * 0.5;
        position.y += canvas_height * 0.5 - grid_size * 8;

        return position;
    }

    draw() {
        var isometric_position = this.transform_isometric();
        
        context.drawImage(
            this.image,
            isometric_position.x,
            isometric_position.y,
            this.image.width,
            this.image.height
        );
    }

    moveTo(x, y) {
        this.position.x = x;
        this.position.y = y;
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