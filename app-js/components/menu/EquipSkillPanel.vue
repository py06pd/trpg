<template>
    <div class="menu-panel" style="padding: 10px 0">
        <div>Skills</div>
        <table v-if="gear">
            <tr v-for="skill in gear.getSkills()" :key="skill.getName()">
                <td class="cell-first">{{ skill.getLabel() }}</td>
                <td class="cell-last" style="text-align: right">{{ getProgress(skill).toString() + '/' + skill.getCost('learn') }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import Character from '../../model/character';
import Gear from '../../model/gear';

export default {
    name: 'EquipSkillPanel',
    props: {
        character: {
            type: Character,
            required: true,
        },
        gear: {
            type: Gear,
            default: null,
        },
    },
    methods: {
        getSkill (name) {
            return this.character.getSkills().find(x => x.getName() == name);
        },
        getProgress (skill) {
            let learn = this.getSkill(skill.getName());
            return learn ? (skill.getCost('learn') - learn.getCost('learn')) : 0;
        },
    },
};
</script>
