export default class Job
{
    constructor (jobData) {
        this.name = jobData.id;
        this.label = jobData.name;
        this.gear = jobData.gear;
    }

    canEquip (type) {
        return this.gear.includes(type);
    }

    getName () {
        return this.name;
    }

    getLabel () {
        return this.label;
    }
}
