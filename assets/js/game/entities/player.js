class Player extends Entity {
    inventory = new Inventory();

    equipment = {
        weapon: null,
        shield: null,
        gauntlet: null,
        ring: null,
        helmet: null,
        chest_armour: null,
        leg_armour: null,
        boots: null,
        pendant: null
    }

    /**
     * 
     * @param {Number} x - Player's x position
     * @param {Number} y - Player's y position
     * @param {Stats} stats - Player's stats
     */
    constructor(x, y, stats = new Stats()) {
        super(x, y, "./assets/img/entities/player.png");
        this.stats = stats;
    }

    /**
     * Equips an Item to the Player and updates the Player's stats.
     * If the Item that is being equipped replaces an Item already equipped,
     * it returns it to the Player's inventory.
     * 
     * @param {Item} item - The Item to be equipped
     */
    equip_item(item = null) {
        if (item === null) return;
        var type = ItemType.get_type(item.type);
        if (this.equipment[type] !== null) {
            this.unequip_item(this.equipment[type]);
        }
        this.remove_item_from_inventory(item);
        this.equipment[type] = item;
        this.update_stats(item, true);
    }
    
    /**
     * Unequips an Item from the Player, updates the Player's stats and
     * returns the Item that is being unequipped to the Player's inventory.
     * 
     * @param {Item} item - The Item to be unequipped
     */
    unequip_item(item = null) {
        if (item === null) return;
        var type = ItemType.get_type(item.type);
        if (this.equipment[type] !== null) {
            this.add_item_to_inventory(this.equipment[type]);
            this.equipment[type] = null;
            this.update_stats(item, false);
        }
    }

    /**
     * Updates the stats of the Player from an Item's stats.
     * 
     * @param {Item} item - The item to update the players stats from
     * @param {boolean} equipped - Whether the item is being equipped or not
     */
    update_stats(item = null, equipped = null) {
        if (item === null || equipped === null) return;
        for (const stat in item.stats) {
            if (Object.hasOwnProperty.call(this.stats, stat)) {
                if (equipped) {
                    this.stats[stat] += item.stats[stat];
                } else {
                    this.stats[stat] -= item.stats[stat];
                }
            }
        }
    }

    /**
     * Adds an Item to the Player's Inventory
     * 
     * @param {Item} item - The item to be added to the Inventory
     */
    add_item_to_inventory(item = null) {
        if (item === null) return;
        inventory.add_item_to_stack(item);
    }

    /**
     * Removees an Item from the Player's Inventory
     * 
     * @param {Item} item - The item to be removed from the Inventory
     */
    remove_item_from_inventory(item = null) {
        if (item === null) return;
        inventory.remove_item_from_stack(item);
    }
}