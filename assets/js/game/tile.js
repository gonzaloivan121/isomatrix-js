class Tile {
    isometric_position = new Vector();
    selected = false;

    constructor(x, y, image_src = "./assets/img/tile.png") {
        this.position = new Vector(x, y);
        this.image = new Image();
        this.image.src = image_src;
        this.image.height = image_size;
        this.image.width = image_size;
        //this.original_position = new Vector(x, y);
        //this.selected_position = new Vector(x - 0.25, y - 0.25);
    }

    update() {
        this.set_image_size();
        //this.check_selected();
        this.draw();
    }

    /*check_selected() {
        if (this.selected) {
            this.select();
        } else {
            this.unselect();
        }
    }*/

    set_image_size() {
        this.image.height = image_size;
        this.image.width = image_size;
    }

    set_image(image_src) {
        this.image.src = image_src;
    }

    set_selected(selected) {
        this.selected = selected;
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

    moveTo(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    select() {
        this.position.x = this.selected_position.x;
        this.position.y = this.selected_position.y;
    }

    unselect() {
        this.position.x = this.original_position.x;
        this.position.y = this.original_position.y;
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