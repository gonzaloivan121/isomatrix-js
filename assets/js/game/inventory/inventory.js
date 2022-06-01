class Inventory {
    stacks = [];

    constructor(max_stacks = 16) {
        this.max_stacks = max_stacks;
    }

    add_item_to_stack(item) {
        if (this.stacks.length > 0) {
            this.stacks.forEach(stack => {
                if (stack.item.id === item.id) {
                    stack.increase_quantity();
                }
            })
        } else {
            this.stacks.push(new Stack(item, 1));
        }
    }

    remove_item_from_stack(item) {
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