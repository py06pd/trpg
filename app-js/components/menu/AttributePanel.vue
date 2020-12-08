<template>
    <div id="actorAttributes" class="menu-panel">
        <table>
            <tr v-for="(attribute, key) in attributes" :key="key">
                <td>{{ attribute }}</td>
                <td :class="{ 'less': getAttribute(key) < character.getAttribute(key).getValue(), 'more': character.getAttribute(key).getValue() < getAttribute(key) }" style="text-align: right">
                    {{ getAttribute(key) }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Character from '../../model/character';
import Gear from '../../model/gear';

export default {
    name: 'AttributePanel',
    props: {
        character: {
            type: Character,
            required: true,
        },
        equipSlot: {
            type: String,
            default: null,
        },
        gear: {
            type: Gear,
            default: null,
        },
    },
    data () {
        return {
            attributes: {
                str: 'Strength',
                def: 'Defence',
                int: 'Intelligence',
                res: 'Resistance',
                agi: 'Speed',
                hit: 'Hit',
                eva: 'Evasion',
                luck: 'Luck',
            },
        };
    },
    computed: {
        clone () {
            let clone = null;
            if (this.equipSlot) {
                clone = this.character.tryGear(this.equipSlot, this.gear);
            }

            return clone;
        },
    },
    methods: {
        getAttribute (key) {
            let attribute = this.character.getAttribute(key).getValue();
            if (this.equipSlot) {
                attribute = this.clone.getAttribute(key).getValue();
            }

            return attribute;
        },
    },
};
</script>
