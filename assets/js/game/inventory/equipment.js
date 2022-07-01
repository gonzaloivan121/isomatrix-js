class Equipment {
    weapon = null;
    shield = null;
    gauntlet = null;
    ring = null;
    helmet = null;
    chest_armour = null;
    leg_armour = null;
    boots = null;
    pendant = null;

    constructor(items = []) {
        if (items.length !== 0) {
            for (var i = 0; i < items.length; i++) {
                this.equip_item(items[i]);                
            }
        }
    }

    equip_item(item = null) {
        if (item === null) return;
        const type = ItemType.get_type(item.type);
        if (this[type] !== null) {
            this.unequip_item(this[type]);
        }
        player.remove_item_from_inventory(item);
        this[type] = item;
        player.update_stats(item.stats, true);
    }

    unequip_item(item = null) {
        if (item === null) return;
        const type = ItemType.get_type(item.type);
        if (this[type] !== null) {
            player.add_item_to_inventory(this[type]);
            this[type] = null;
            player.update_stats(item.stats, false);
        }
    }
}