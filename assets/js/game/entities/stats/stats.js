class Stats {
    level = 1;
    health = 100;
    max_health = 100;
    experience = 0;
    experience_to_level_up = 5;
    upgrade_points = 0;
    attack = 1;
    critical_chance = 5;
    critical_multiplier = 2;
    defence = 1;
    block_chance = 5;
    action_area = 1;

    constructor(attack = 1, defence = 1, critical_chance = 5, critical_multiplier = 2, block_chance = 5, action_area = 1) {
        this.attack = attack;
        this.defence = defence;
        this.critical_chance = critical_chance;
        this.critical_multiplier = critical_multiplier;
        this.block_chance = block_chance;
        this.action_area = action_area;
    }

    level_up() {
        this.level++;
        this.increase_upgrade_points(1);
        this.experience -= this.experience_to_level_up;
        this.experience_to_level_up *= 2;

        if (this.experience >= this.experience_to_level_up) {
            this.level_up();
        }
    }

    increase_health(health) {
        if (this.health + health >= this.max_health) {
            this.health = this.max_health;
        } else {
            this.health += health;
        }
    }

    decrease_health(health) {
        if (this.health - health <= 0) {
            this.health = 0;
        } else {
            this.health -= health;
        }
    }

    increase_max_health(max_health) {
        this.max_health += max_health;
    }

    decrease_max_health(max_health) {
        this.max_health -= max_health;
    }

    gain_experience(experience) {
        this.experience += experience;

        if (this.experience >= this.experience_to_level_up) {
            this.level_up();
        }
    }

    increase_upgrade_points(upgrade_points) {
        this.upgrade_points += upgrade_points;
    }

    decrease_upgrade_points(upgrade_points) {
        this.upgrade_points -= upgrade_points;
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

    increase_action_area(action_area) {
        this.action_area += action_area;
    }

    decrease_action_area(action_area) {
        this.action_area -= action_area;
    }
}