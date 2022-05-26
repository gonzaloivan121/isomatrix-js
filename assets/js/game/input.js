class Input {
    static up = "W";
    static down = "S";
    static left = "A";
    static right = "D";
    static jump = " ";
    static run = "SHIFT";
    static dance = "M";

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
            this[bind] = key;
        }
    }

    static get_bind_keys() {
        var obj = [];
        for (const bind in this) {
            obj[bind] = this[bind];
        }
        return obj;
    }

    static get_binds() {
        var binds = [];
        for (const bind in this) {
            binds.push(bind);
        }
        return binds;
    }
}