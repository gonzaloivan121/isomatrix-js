class Inventory {
    stacks = [];

    /**
     * Inventory system
     * 
     * @param {Number} max_stacks - The maximum ammount of Items that the Inventory can hold
     */
    constructor(max_stacks = 15) {
        this.max_stacks = max_stacks;
    }

    /**
     * Adds an Item to it's stack. If the stack doesn't exist, it creates one.
     * 
     * @param {Item} item - The Item to be added to the Stack
     */
    add_item_to_stack(item = null) {
        if (item === null) return;
        if (this.stacks.length > 0) {
            for (var i = 0; i < this.stacks.length; i++) {
                const stack = this.stacks[i];
                if (stack.item.id === item.id) {
                    // TODO: fix inventory aggregation when stack size exceed its maximum
                    if (item.can_stack && stack.quantity < item.max_stack_size) {
                        stack.increase_quantity();
                    } else {
                        if (this.stacks.length < this.max_stacks) {
                            this.stacks.push(new Stack(item, 1));
                        } else {
                            return { status: false, message: "Inventory can't hold more than " + this.max_stacks + " items." };
                        }
                    }
                }
            }
        } else {
            if (this.stacks.length < this.max_stacks) {
                this.stacks.push(new Stack(item, 1));
            } else {
                return { status: false, message: "Inventory can't hold more than " + this.max_stacks + " items." };
            }
        }
    }

    /**
     * Removes an Item from it's stack if the stack exists.
     * If the Item's quantity is higher than 1, it reduces
     * the quantity of the Item. If not, it deletes the stack.
     * 
     * @param {Item} item - The Item to be removed from the Stack
     */
    remove_item_from_stack(item = null) {
        if (item === null) return;
        if (!this.stacks.length > 0) {
            return null;
        } else {
            var result = false;
            for (var i = 0; i < this.stacks.length; i++) {
                const stack = this.stacks[i];
                if (stack.item.id === item.id) {
                    if (stack.quantity > 1) {
                        stack.decrease_quantity();
                    } else {
                        this.stacks.splice(i, 1);
                    }
                    result = true;
                }
            }
            return result;
        }
    }
}