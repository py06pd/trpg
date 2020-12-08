import Attribute from './attribute';
import data from '../data.json';

export default class Character
{
    constructor (characterData) {
        this.type = characterData.enemy ? 'enemy' : 'hero';
        this.name = characterData.id;
        this.label = characterData.name;
        this.face = characterData.face;
        this.sprite = characterData.sprite;
        this.attributes = {};
        this.baseAttributes = {};
        this.gear = {};
        this.skills = [];
    }

    getAttribute (name) {
        return this.attributes[name];
    }

    getBaseAttribute (name) {
        return this.baseAttributes[name];
    }

    getFace () {
        return this.face;
    }

    getGear (slot) {
        if (this.gear[slot]) {
            return this.gear[slot];
        }

        return null;
    }

    setGear (slot, gear) {
        this.gear[slot] = gear;
        let attributes = {};
        for (let i in this.baseAttributes) {
            let max = this.baseAttributes[i].getMax();
            for (let j in this.gear) {
                if (this.gear[j] && this.gear[j].getAttribute(i)) {
                    max += this.gear[j].getAttribute(i).getValue();
                }
            }
            attributes[i] = new Attribute(max, this.baseAttributes[i].getLimit());
            attributes[i].clamp(this.attributes[i].getValue());
        }

        this.attributes = attributes;
    }

    getJob () {
        return this.job;
    }

    setJob (job) {
        this.job = job;
    }

    getLabel () {
        return this.label;
    }

    getName () {
        return this.name;
    }

    getSprite () {
        return this.sprite;
    }

    getSkills () {
        return this.skills;
    }

    getType () {
        return this.type;
    }

    toNextLevel () {
        return (Math.pow(this.attributes['level'].getValue(), 2) * 10) - this.attributes['exp'].getValue();
    }

    tryGear (slot, gear) {
        let clone = new Character(data, this.name);
        clone.attributes = this.attributes;
        clone.baseAttributes = this.baseAttributes;
        Object.keys(this.gear).forEach(x => {
            clone.setGear(x, this.gear[x]);
        });
        clone.setGear(slot, gear);
        return clone;
    }
}
