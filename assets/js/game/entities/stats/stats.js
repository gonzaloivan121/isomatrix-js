class Stats {
    health = 100;
    level = 1;
    experience = 0;
    experience_to_level_up = 5;
    attack = 1;
    critical_chance = 20;
    critical_multiplier = 2;
    defence = 1;
    movement_area = 1;

    constructor(level = 1, attack = 1, defence = 1, movement_area = 1) {
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.movement_area = movement_area;
    }

    decrease_health(health) {
        if (this.health - health <= 0) {
            this.health = 0;
        } else {
            this.health -= health;
        }
    }

    increase_health(health) {
        if (this.health + health >= 100) {
            this.health = 100;
        } else {
            this.health += health;
        }
    }

    level_up() {
        this.level++;
        this.experience -= this.experience_to_level_up;
        this.experience_to_level_up *= 2;

        if (this.experience >= this.experience_to_level_up) {
            this.level_up();
        }
    }

    gain_experience(experience) {
        this.experience += experience;

        if (this.experience >= this.experience_to_level_up) {
            this.level_up();
        }
    }

    increase_attack(attack) {
        this.attack += attack;
    }

    decrease_attack(attack) {
        this.attack -= attack;
    }

    increase_critical_chance(critical_chance) {
        this.critical_chance += critical_chance;
    }

    decrease_critical_chance(critical_chance) {
        this.critical_chance -= critical_chance;
    }

    increase_critical_multiplier(critical_multiplier) {
        this.critical_multiplier += critical_multiplier;
    }

    decrease_critical_multiplier(critical_multiplier) {
        this.critical_multiplier -= critical_multiplier;
    }

    increase_defence(defence) {
        this.defence += defence;
    }

    decrease_defence(defence) {
        this.defence -= defence;
    }

    increase_movement_area(movement_area) {
        this.movement_area += movement_area;
    }

    decrease_movement_area(movement_area) {
        this.movement_area -= movement_area;
    }
}