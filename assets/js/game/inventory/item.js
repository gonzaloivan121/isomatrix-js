class Item {
    constructor(id, name = "New Item", description = "This is the item's description", type = ItemType.miscellaneous, buy_value = 0, sell_value = 0, can_stack = true, max_stack_size = 64, image_src = "") {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.buy_value = buy_value;
        this.sell_value = sell_value;
        this.can_stack = can_stack;
        this.max_stack_size = max_stack_size;
        this.image = new Image();
        this.image.src = image_src;
    }
}