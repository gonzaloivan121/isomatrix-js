class Item {
    constructor(id, name = "New Item", description = "This is the item's description", can_stack = true, max_stack_size = 64, image_src = "") {
        this.id = id;
        this.name = name;
        this.description = description;
        this.can_stack = can_stack;
        this.max_stack_size = max_stack_size;
        this.image = new Image();
        this.image.src = image_src;
    }
}