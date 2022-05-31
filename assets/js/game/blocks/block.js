class Block extends Tile {
    selected = false;

    constructor(x, y, image_src) {
        super(x, y, image_src);
        this.original_position = new Vector(x, y);
        this.is_hover_position = new Vector(x - 0.25, y - 0.25);
    }

    set_selected(selected) {
        if (selected) {
            if (this.image.src[this.image.src.length - 5] !== "_") {
                this.image.src = this.image.src.replace(".png", "_selected_.png");
            }
        } else {
            this.image.src = this.image.src.replace("_selected_.png", ".png");
        }
        this.selected = selected;
    }

    hover(selected) {
        if (selected) {
            this.position.x = this.is_hover_position.x;
            this.position.y = this.is_hover_position.y;
        } else {
            this.position.x = this.original_position.x;
            this.position.y = this.original_position.y;
        }
    }
}