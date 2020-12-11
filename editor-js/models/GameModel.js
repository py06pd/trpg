import CharacterModel from '@/models/CharacterModel';
import ItemModel from '@/models/ItemModel';
import JobModel from '@/models/JobModel';
import MapModel from '@/models/MapModel';
import SkillModel from '@/models/SkillModel';

export default class GameModel {

    constructor (data) {
        this.data = { armours: [], attributes: [], characters: [], equipSlots: [], items: [], jobs: [], maps: [], skills: [], weapons: [] };
        if (data.attributes) {
            this.data.attributes = data.attributes;
        }
        if (data.characters) {
            this.data.characters = data.characters.map(x => new CharacterModel(x));
        }
        if (data.equipSlots) {
            this.data.equipSlots = data.equipSlots;
        }
        if (data.items) {
            this.data.items = data.items.filter(x => x.type !== 'gear').map(x => new ItemModel(x));
            this.data.armours = data.items.filter(x => x.type === 'gear' && !x.slots.includes('hand1')).map(x => {
                if (x.skills) {
                    let learning = [];
                    x.skills.forEach(x => {
                        let skill = data.skills.find(y => y.id === x);
                        if (skill && skill.cost && skill.cost.learn) {
                            learning.push({
                                skill: x,
                                attribute: 'ap',
                                value: skill.cost.learn,
                            });
                        }
                    });
                    x.learning = learning;
                }

                return new ItemModel(x);
            });
            this.data.weapons = data.items.filter(x => x.type === 'gear' && x.slots.includes('hand1')).map(x => {
                if (x.skills) {
                    let learning = [];
                    x.skills.forEach(x => {
                        let skill = data.skills.find(y => y.id === x);
                        if (skill && skill.cost && skill.cost.learn) {
                            learning.push({
                                skill: x,
                                attribute: 'ap',
                                value: skill.cost.learn,
                            });
                        }
                    });
                    x.learning = learning;
                }

                return new ItemModel(x);
            });
        }
        if (data.jobs) {
            this.data.jobs = data.jobs.map(x => new JobModel(x));
        }
        if (data.maps) {
            this.data.maps = data.maps.map(x => new MapModel(x));
        }
        if (data.skills) {
            this.data.skills = data.skills.map(x => new SkillModel(x));
        }
    }

    addArmour (item) {
        this.data.armours.push(item);
    }

    addCharacter (item) {
        this.data.characters.push(item);
    }

    addItem (item) {
        this.data.items.push(item);
    }

    addJob (item) {
        this.data.jobs.push(item);
    }

    addSkill (item) {
        this.data.skills.push(item);
    }

    addWeapon (item) {
        this.data.weapons.push(item);
    }

    getArmours () {
        return this.data.armours;
    }

    getArmourTypes () {
        return ['General Armour', 'Heavy Armour', 'Light Armour', 'Magic Armour', 'Shield', 'Wrist'];
    }

    getAttributes () {
        return this.data.attributes;
    }

    getCharacters () {
        return this.data.characters;
    }

    getData () {
        let data = JSON.parse(JSON.stringify(this.data));
        data.armours = this.data.armours.map(x => x.data);
        data.attributes = this.data.attributes;
        data.characters = this.data.characters.map(x => x.data);
        data.equipSlots = this.data.equipSlots;
        data.items = this.data.items.map(x => x.data);
        data.jobs = this.data.jobs.map(x => x.data);
        data.maps = this.data.maps.map(x => x.data);
        data.skills = this.data.skills.map(x => x.data);
        data.weapons = this.data.weapons.map(x => x.data);
        return data;
    }

    getEquipSlots () {
        return this.data.equipSlots;
    }

    getGear (slot) {
        if (slot === 'hand1') {
            return this.data.weapons.filter(x => x.getSlots().includes(slot));
        } else {
            return this.data.armours.filter(x => x.getSlots().includes(slot));
        }
    }

    getItems () {
        return this.data.items;
    }

    getJobs () {
        return this.data.jobs;
    }

    getMap (index) {
        return this.data.maps[index];
    }

    getMaps () {
        return this.data.maps;
    }

    getSkills () {
        return this.data.skills;
    }

    getWeapons () {
        return this.data.weapons;
    }

    getWeaponTypes () {
        return ['Axe', 'Bow', 'Dagger', 'Heavy Sword', 'Instrument', 'Light Sword', 'Spear', 'Staff', 'Tome'];
    }

    removeArmours (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.armours.find(y => y.getId() === x));
        });
    }

    removeCharacters (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.characters.find(y => y.getId() === x));
        });
    }

    removeItems (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.items.find(y => y.getId() === x));
        });
    }

    removeJobs (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.jobs.find(y => y.getId() === x));
        });
    }

    removeSkills (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.skills.find(y => y.getId() === x));
        });
    }

    removeWeapons (itemIds) {
        itemIds.forEach(x => {
            delete(this.data.weapons.find(y => y.getId() === x));
        });
    }
}
