class Stack {
    constructor(item = new Item(0), quantity = 1) {
        this.item = item;
        this.quantity = quantity;
    }

    increase_quantity() {
        this.quantity++;
    }

    decrease_quantity() {
        this.quantity--;
    }
}