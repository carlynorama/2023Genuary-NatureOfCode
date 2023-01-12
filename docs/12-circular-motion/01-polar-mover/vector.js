"use strict";
//https://www.robinwieruch.de/linear-algebra-matrix-javascript/
//A large chunck of this code is from the following tutorial. Great way to learn the map syntax! WooHoo!
//https://radzion.com/blog/linear-algebra/vectors
class Vector {
    constructor(...components) {
        this.scaledBy = (value) => {
            return new Vector(...this.components.map(component => component * value));
        };
        this.components = components;
    }
    static createAngleVector(angle, magnitude = 1) {
        return new Vector(cos(angle) * magnitude, sin(angle) * magnitude);
    }
    get x() { return this.components[0]; } //i-hat
    get y() { return this.components[1]; } //j-hat
    get z() { return this.components[2]; } //k-hat
    copy() { return new Vector(...this.components); }
    //add({ components }) //TypeScript had trouble with this?
    //ahhh this is the fix dotProduct({ components } : { components: number[] })
    //https://bobbyhadz.com/blog/typescript-binding-element-implicitly-has-an-any-type
    addedValues(...values) {
        return new Vector(...values.map((component, index) => this.components[index] + component));
    }
    added(other) {
        return new Vector(...other.components.map((component, index) => this.components[index] + component));
    }
    static added(lhs, rhs) {
        return new Vector(...rhs.components.map((component, index) => lhs.components[index] + component));
    }
    // add(...otherValues: number[]) {
    //     const oa = otherValues;
    //     if (this.values.length === oa.length) {
    //       let result: number[] = [];
    //       for(let key in this.values) {
    //         result[key] = this.values[key] + oa[key]
    //       }
    //       return new Vector(...result)
    //     }
    //   }
    subtractedValues(...values) {
        return new Vector(...values.map((component, index) => this.components[index] - component));
    }
    subtracted(other) {
        return new Vector(...other.components.map((component, index) => this.components[index] - component));
    }
    static subtracted(lhs, rhs) {
        return new Vector(...rhs.components.map((component, index) => lhs.components[index] - component));
    }
    normalized() { return this.scaledBy(1 / this.length()); }
    negated() { return this.scaledBy(-1); }
    length() { return Math.hypot(...this.components); }
    magnitude() { return Math.hypot(...this.components); }
    magnitudeSquared() {
        // let mag = Math.hypot(...this.components); 
        // return mag ** 2 
        // return this.components.map((component) =>  component ** 2).reduce(function(sum, value) {
        //     return sum + value;
        // }, 0);
        return this.components.reduce(function (sumSq, value) { return sumSq + (value ** 2); }, 0);
    }
    rotated(angle) {
        return Vector.rotated(this, angle);
    }
    static rotated(lhs, angle) {
        let l = lhs.length();
        let newAngle = lhs.angle() + angle;
        return Vector.createAngleVector(newAngle, l);
    }
    //only valid on 2D vectors
    angle() {
        let n = this.normalized();
        return Math.atan2(n.y, n.x);
    }
    //The dot product tells us how similar two vectors are to each other. 
    //It takes two vectors as input and produces a single number as an output.
    //The dot product between two vectors is the sum of the products of corresponding components.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    dotProduct({ components }) {
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0);
    }
    //If we take the dot product of two normalized vectors and the result is equal to one it means that they have the same direction. 
    //To compare two float numbers, we will use the areEqual function.
    //citation: https://radzion.com/blog/linear-algebra/vectors
    hasSameDirectionWith(other) {
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, 1);
    }
    hasOppositeDirectionTo(other) {
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, -1);
    }
    isPerpendicularTo(other) {
        const dotProduct = this.normalized().dotProduct(other.normalized());
        return Vector.floatsAreEqual(dotProduct, 0);
    }
    // 3D vectors only
    crossProduct({ components }) {
        return new Vector(this.components[1] * components[2] - this.components[2] * components[1], this.components[2] * components[0] - this.components[0] * components[2], this.components[0] * components[1] - this.components[1] * components[0]);
    }
    angleBetween(other) {
        return Vector.toDegrees(Math.acos(this.dotProduct(other) / (this.length() * other.length())));
    }
    projectOn(other) {
        const normalized = other.normalized();
        return normalized.scaledBy(this.dotProduct(normalized));
    }
    withLength(newLength) {
        return this.normalized().scaledBy(newLength);
    }
    equalTo({ components }) {
        return components.every((component, index) => Vector.floatsAreEqual(component, this.components[index]));
    }
}
//how small of a difference do we care about when doing comparisons. 
Vector.EPSILON = 0.00000001;
Vector.floatsAreEqual = (lhs, rhs, epsilon = Vector.EPSILON) => Math.abs(lhs - rhs) < epsilon;
Vector.toDegrees = (radians) => (radians * 180) / Math.PI;
Vector.toRadians = (degrees) => (degrees * Math.PI) / 180;
Vector.zero2D = () => { return new Vector(0, 0); };
Vector.random2D = (scalar = 1) => { return new Vector(Math.random() * scalar, Math.random() * 1); };
Vector.scaledBy = (lhs, value) => {
    return new Vector(...lhs.components.map(component => component * value));
};
//# sourceMappingURL=vector.js.map