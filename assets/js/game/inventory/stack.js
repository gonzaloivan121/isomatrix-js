class Stack {
    /**
     * 
     * @param {Item} item - The Item to add to the Stack
     * @param {Number} quantity - The quantity of the Item to add to the Stack
     */
    constructor(item = new Item(0), quantity = 1) {
        this.item = item;
        this.quantity = quantity;
    }

    /**
     * Increases the Stack quantity
     */
    increase_quantity() {
        this.quantity++;
    }

    /**
     * Decreases the Stack quantity
     */
    decrease_quantity() {
        this.quantity--;
    }
}