export default class Gear
{
    constructor (gearData = {}) {
        this.name = gearData.id;
        this.label = gearData.name;
        this.icon = gearData.icon ? gearData.icon : 0;
        this.type = gearData.type;
        this.gearType = gearData.gearType;
        this.slots = gearData.slots;

        this.attributes = {};
        this.skills = [];
    }

    canEquip (slot) {
        return this.type === 'gear' && this.slots.includes(slot);
    }

    getAttribute (name) {
        return this.attributes[name];
    }

    getGearType () {
        return this.gearType;
    }

    getIcon () {
        return this.icon;
    }

    getLabel () {
        return this.label;
    }

    getName () {
        return this.name;
    }

    addSkill (skill) {
        this.skills.push(skill);
    }

    getSkills () {
        return this.skills;
    }
}
