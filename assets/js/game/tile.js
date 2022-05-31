class Tile {
    isometric_position = new Vector();

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
        if (this.image.height !== image_size) {
            this.image.height = image_size;
        }

        if (this.image.width !== image_size) {
            this.image.width = image_size;
        }
    }

    set_image(image_src) {
        this.image.src = image_src;
    }

    draw() {
        this.isometric_position = Utilities.transform_isometric(this.position);

        context.drawImage(
            this.image,
            this.isometric_position.x,
            this.isometric_position.y,
            this.image.width,
            this.image.height
        );
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