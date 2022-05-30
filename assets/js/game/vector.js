class Vector {
    static zero = new Vector(0, 0);
    static up = new Vector(0, -1);
    static down = new Vector(0, 1);
    static left = new Vector(-1, 0);
    static right = new Vector(1, 0);

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sums two Vectors
     * 
     * @param {Vector} v1 - Vector 1
     * @param {Vector} v2 - Vector 2
     * @returns {Vector} The resulting Vector
     */
    static sum(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtracts two Vectors
     * 
     * @param {Vector} v1 - Vector 1
     * @param {Vector} v2 - Vector 2
     * @returns {Vector} The resulting Vector
     */
    static subtract(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Multiplies two Vectors
     * 
     * @param {Vector} v1 - Vector 1
     * @param {Vector} v2 - Vector 2
     * @returns {Vector} The resulting Vector
     */
    static multiply(v1, v2) {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }

    /**
     * Divides two Vectors
     * 
     * @param {Vector} v1 - Vector 1
     * @param {Vector} v2 - Vector 2
     * @returns {Vector} The resulting Vector
     */
    static divide(v1, v2) {
        return new Vector(v1.x / v2.x, v1.y / v2.y);
    }

    sum(v) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
    }

    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
    }
}