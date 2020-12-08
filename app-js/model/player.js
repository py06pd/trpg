import Attribute from './attribute';
import Character from './character';
import Gear from './gear';
import Job from './job';
import Skill from './skill';

export default class Player {
    constructor () {
    }

    load (gameData) {
        this.party = [];
        for (let i = 1; i < 10; i++) {
            let characterData = gameData.characters.find(x => x.id == 'actor' + i);
            let jobData = gameData.jobs.find(x => x.id == characterData.job);
            let character = new Character(characterData);
            character.setJob(new Job(jobData));
            for (let i in gameData.attributes) {
                character.attributes[i] = new Attribute(Object.keys(characterData.attributes).includes(i) ? characterData.attributes[i] : 1, gameData.attributes[i]);
                character.baseAttributes[i] = new Attribute(Object.keys(characterData.attributes).includes(i) ? characterData.attributes[i] : 1, gameData.attributes[i]);
            }

            gameData.equipSlots.forEach(x => {
                let gear = null;
                if (characterData.gear[x]) {
                    let gearData = gameData.items.find(y => y.id == characterData.gear[x]);
                    gear = this.loadGear(gameData, gearData);
                }
                character.setGear(x, gear);
            });

            this.party.push(character);
        }

        this.inventory = [];
        gameData.items.filter(x => x.type === 'gear').forEach(x => {
            this.inventory.push(this.loadGear(gameData, x));
        });
    }

    loadGear (gameData, gearData) {
        let gear = new Gear(gearData);
        for (let i in gameData.attributes) {
            gear.attributes[i] = new Attribute(gearData.attributes && Object.keys(gearData.attributes).includes(i) ? gearData.attributes[i] : 0, gameData.attributes[i]);
        }
        if (gearData.skills) {
            gearData.skills.forEach(x => {
                let skillData = gameData.skills.find(y => y.id == x);
                gear.addSkill(new Skill(skillData));
            });
        }

        return gear;
    }
}
