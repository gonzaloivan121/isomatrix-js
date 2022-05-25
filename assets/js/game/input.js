class Input {
    static up = "W";
    static down = "S";
    static left = "A";
    static right = "D";
    static jump = " ";
    static run = "SHIFT";

    static any(key) {
        for (const bind in this) {
            if (this[bind] === key) {
                return true;
            }
        }

        return false;
    }

    static bind(bind, key) {
        if (this.hasOwnProperty(bind)) {
            console.log(bind, key)
            this[bind] = key;
        }
    }

    static get_binds() {
        var obj = [];
        for (const bind in this) {
            obj[bind] = this[bind];
        }
        return obj;
    }
}