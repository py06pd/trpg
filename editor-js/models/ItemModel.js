export default class ItemModel {
    constructor (data) {
        this.data = data;
        if (data.attributes) {
            let attributes = [];
            Object.keys(data.attributes).forEach(x => {
                attributes.push({
                    attribute: x,
                    operator: '+',
                    value: data.attributes[x],
                });
            });
            this.data.attributes = attributes;
        }
        delete(this.data.skills);
    }

    getId () {
        return this.data.id;
    }

    addAttribute () {
        if (!this.data.attributes) {
            this.data.attributes = [];
        }
        this.data.attributes.push({
            attribute: null,
            operator: '+',
            value: 0,
        });
    }

    getAttributes () {
        if (this.data.attributes) {
            return this.data.attributes;
        }

        return [];
    }

    removeAttribute (index) {
        this.data.attributes.splice(index, 1);
    }

    setAttribute (index, field, value) {
        this.data.attributes[index][field] = value;
    }

    getGearType () {
        return this.data.gearType;
    }

    setGearType (val) {
        this.data.gearType = val;
    }

    getIcon () {
        return this.data.icon;
    }

    setIcon (val) {
        this.data.icon = val;
    }

    addLearning () {
        if (!this.data.learning) {
            this.data.learning = [];
        }
        this.data.learning.push({
            skill: null,
            attribute: null,
            value: 0,
        });
    }

    getLearning () {
        if (this.data.learning) {
            return this.data.learning;
        }

        return [];
    }

    removeLearning (index) {
        this.data.learning.splice(index, 1);
    }

    setLearning (index, field, value) {
        this.data.learning[index][field] = value;
    }

    getName () {
        return this.data.name;
    }

    setName (val) {
        this.data.name = val;
    }

    getSlots () {
        return this.data.slots;
    }

    setSlots (val) {
        this.data.slots = val;
    }
}
