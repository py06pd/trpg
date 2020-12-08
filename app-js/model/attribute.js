export default class Attribute
{
    constructor (value, limit) {
        this.value = Math.min(limit, Math.max(0, value));
        this.max = Math.min(limit, Math.max(0, value));
        this.limit = limit;
    }
    
    clamp (value) {
        return Math.min(this.max, Math.max(0, value));
    }

    getLimit () {
        return this.limit;
    }

    getMax () {
        return this.max;
    }

    getValue () {
        return this.value;
    }

    reduce (amount) {
        this.value = this.clamp(this.value - amount);
    }
}
