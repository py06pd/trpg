export default class ItemModel {
    constructor (data) {
        this.data = data;
    }

    getId () {
        return this.data.id;
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
