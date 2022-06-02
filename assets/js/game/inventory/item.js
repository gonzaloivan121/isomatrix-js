class Item {
    /**
     * Inventory item
     * 
     * @param {Number} id - The Item's ID
     * @param {String} name - The Item's name
     * @param {String} description - The Item's description
     * @param {ItemType} type - The Item's type
     * @param {Number} buy_value - The Item's buy value
     * @param {Number} sell_value - The Item's sell value
     * @param {Boolean} can_stack - Whether the Item can be stacked or not
     * @param {Number} max_stack_size - The Item's maximum stack size
     * @param {String} image_src - The Item's image source
     * @param {object} stats - The Item's stats
     */
    constructor(
        id, name = "New Item", description = "This is the item's description",
        type = ItemType.miscellaneous, buy_value = 0, sell_value = 0, can_stack = true,
        max_stack_size = 64, image_src = "", stats = null
    ) {
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
        this.stats = stats;
    }
}