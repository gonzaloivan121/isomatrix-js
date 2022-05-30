class Stats {
    health = 100;
    level = 1;
    experience = 0;
    experience_to_level_up = 5;
    attack = 1;
    defence = 1;
    movement_area = 1;

    constructor(level = 1, attack = 1, defence = 1, movement_area = 1) {
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.movement_area = movement_area;
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