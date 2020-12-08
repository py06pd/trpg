export default class SkillModel {
    constructor (data) {
        this.data = data;
    }

    getId () {
        return this.data.id;
    }

    getName () {
        return this.data.name;
    }

    setName (val) {
        this.data.name = val;
    }

    getTypes () {
        return this.data.types;
    }

    setTypes (val) {
        this.data.types = val;
    }
}

