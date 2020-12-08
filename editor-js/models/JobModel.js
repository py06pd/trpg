export default class JobModel {
    constructor (data) {
        this.data = data;
        if (data.gear) {
            this.data.armourTypes = data.gear.filter(x => ['General Armour', 'Heavy Armour', 'Light Armour', 'Magic Armour'].includes(x));
            this.data.weaponTypes = data.gear.filter(x => !['General Armour', 'Heavy Armour', 'Light Armour', 'Magic Armour'].includes(x));
            delete(this.data.gear);
        }
        if (data.promotion) {
            this.data.promotions = data.promotion;
            delete(this.data.promotion);
        }
    }

    getId () {
        return this.data.id;
    }

    getArmourTypes () {
        return this.data.armourTypes;
    }

    setArmourTypes (val) {
        this.data.armourTypes = val;
    }

    getName () {
        return this.data.name;
    }

    setName (val) {
        this.data.name = val;
    }

    getPromotions () {
        if (this.data.promotions) {
            return this.data.promotions;
        }

        return [];
    }

    setPromotions (val) {
        this.data.promotions = val;
    }

    getSkill () {
        return this.data.skill;
    }

    setSkill (val) {
        this.data.skill = val;
    }

    getWeaponTypes () {
        return this.data.weaponTypes;
    }

    setWeaponTypes (val) {
        this.data.weaponTypes = val;
    }
}
