export default class CharacterModel {
    constructor (data = null) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                id: null,
                name: null,
                job: null,
                face: null,
                sprite: null,
                gear: {},
                attributes: {},
            };
        }
    }

    getId () {
        return this.data.id;
    }

    getAttribute (attribute) {
        if (this.data.attributes[attribute]) {
            return this.data.attributes[attribute];
        }

        return null;
    }

    setAttribute (attribute, value) {
        this.data.attributes[attribute] = value;
    }

    getFace () {
        return this.data.face;
    }

    setFace (value) {
        this.data.face = value;
    }

    getGear (slot) {
        if (this.data.gear[slot]) {
            return this.data.gear[slot];
        }

        return null;
    }

    setGear (slot, value) {
        this.data.gear[slot] = value;
    }

    getJob () {
        return this.data.job;
    }

    setJob (val) {
        console.log(this);
        this.data.job = val;
    }

    getName () {
        return this.data.name;
    }

    setName (val) {
        this.data.name = val;
    }

    getSprite () {
        return this.data.sprite;
    }

    setSprite (value) {
        this.data.sprite = value;
    }
}
