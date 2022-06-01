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

    equip_item(item) {
        var type = ItemType.get_type(item.type);
        if (this.equipment[type] === null) {
            this.equipment[type] = item;
        } else {
            this.inventory.add_item_to_stack(this.equipment[type]);
            this.equipment[type] = item;
        }
    }
    
    unequip_item(item) {
        var type = ItemType.get_type(item.type);
        if (!this.equipment[type] === null) {
            this.inventory.add_item_to_stack(this.equipment[type]);
            this.equipment[type] = null;
        }
    }
}