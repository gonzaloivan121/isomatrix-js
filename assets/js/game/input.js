class Input {
    static up = "W";
    static down = "S";
    static left = "A";
    static right = "D";
    static jump = " ";
    static run = "SHIFT";

    static any(key) {
        for (const property in this) {
            if (Object.hasOwnProperty.call(this, property)) {
                if (this[property] === key) {
                    return true;
                }
            }
        }

        return false;
    }
}