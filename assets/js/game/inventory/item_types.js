class ItemType {
    /*
    - Equipamento:
        - Cascos
        - Guantes
        - Armadura (Pecho)
        - Armadura (Piernas)
        - Zapatos
        - Anillos
        - Colgantes
    - Armas
    - Escudos
    - Pociones
    - Runas
    - Vendaje
    - Cristales mágicos
    - Piedras de afilar
    - Grimorios de magia
    - Armas de fuego
    - Capa
    - Raciones
    - Moneda
    */
    static weapon = 1;
    static shield = 2;
    static gauntlet = 0.1;
    static ring = 0.2;
    static helmet = 0.3;
    static chest_armour = 0.4;
    static leg_armour = 0.5;
    static boots = 0.6;
    static pendant = 0.7;

    static equipment = 0;
    static power_ups = 3;
    static currency = 4;
    static miscellaneous = 5;

    static get_type(value) {
        var name = false;
        for (const type in this) {
            if (this[type] === value) {
                name = type;
            }
        }
        return name;
    }

    static get_all_types() {
        var names = [];
        for (const type in this) {
            names.push(type);
        }
        return names;
    }

    static get_type_with_nice_names(value) {
        var name = false;
        for (const type in this) {
            if (this[type] === value) {
                name = this.get_nice_names(type);
            }
        }
        return name;
    }

    static get_nice_names(type) {
        var name = false;
        switch (type) {
            case "equipment":
                name = "Equipment";
                break;
            case "helmet":
                name = "Helmet";
                break;
            case "gauntlet":
                name = "Gauntlet";
                break;
            case "chest_armour":
                name = "Chest Armour";
                break;
            case "leg_armour":
                name = "Leg Armour";
                break;
            case "boots":
                name = "Boots";
                break;
            case "ring":
                name = "Ring";
                break;
            case "pendant":
                name = "Pendant";
                break;
            case "weapon":
                name = "Weapon";
                break;
            case "shield":
                name = "Shield";
                break;
            case "power_ups":
                name = "Power Ups";
                break;
            case "currency":
                name = "Currency";
                break;
            case "miscellaneous":
                name = "Miscellaneous";
                break;
        }
        return name;
    }
}