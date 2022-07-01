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
            this.stacks.forEach(stack => {
                if (stack.item.id === item.id) {
                    if (item.can_stack) {
                        stack.increase_quantity();
                    } else {
                        this.stacks.push(new Stack(item, 1));
                    }
                }
            })
        } else {
            this.stacks.push(new Stack(item, 1));
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
            return;
        } else {
            for (var i = 0; i < this.stacks.length; i++) {
                const stack = this.stacks[i];
                if (stack.item.id === item.id) {
                    if (stack.quantity > 1) {
                        stack.decrease_quantity();
                    } else {
                        this.stacks.splice(i, 1);
                    }
                }
            }
        }
    }
}