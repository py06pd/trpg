export default class Skill
{
    constructor (skillData = {}) {
        this.name = skillData.id;
        this.label = skillData.name;
        this.type = skillData.type;
        this.cost = skillData.cost;
    }

    getCost (name) {
        return this.cost && this.cost[name] ? this.cost[name] : 0;
    }

    getName () {
        return this.name;
    }

    getLabel () {
        return this.label;
    }
}
