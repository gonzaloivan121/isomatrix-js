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
            this.inventory.add_item_to_stack(this.equipment[type]);
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
}