<template>
    <div class="menu-panel" style="padding: 10px 0; width: 218px">
        <div>Equipment</div>
        <table>
            <tr
                v-for="(option, optionIndex) in equipSlots"
                :key="optionIndex"
                :class="{ 'hover': enabled && optionIndex === index }"
                @mouseenter="hover(optionIndex)"
                @click="confirm"
            >
                <td class="cell-first" style="width: 34px">
                    <span v-if="character.getGear(option)" :class="'icon icon' + character.getGear(option).getIcon()" />
                    <span v-else class="icon icon97" />
                </td>
                <td class="cell-last">
                    <span v-if="character.getGear(option)">{{ character.getGear(option).getLabel() }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Character from '../../model/character';
import data from '../../data.json';

export default {
    name: 'EquipPanel',
    props: {
        character: {
            type: Character,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            equipSlots: data.equipSlots,
            index: 0,
        };
    },
    methods: {
        change (increment) {
            let index = this.index + increment;
            if (index < 0) {
                index = this.equipSlots.length - 1;
            }
            if (index === this.equipSlots.length) {
                index = 0;
            }

            this.hover(index);
        },

        confirm () {
            this.$emit('change', this.equipSlots[this.index]);
        },

        hover (index) {
            this.index = index;
            this.$emit('input', this.character.getGear(this.equipSlots[this.index]));
        },

        handleInput (input) {
            if (this.enabled) {
                if (input.up()) {
                    this.change(-1);
                }
                if (input.down()) {
                    this.change(1);
                }
                if (input.cancel()) {
                    this.$emit('blur');
                }
                if (input.confirm()) {
                    this.confirm();
                }
            }
        },
    },
};
</script>
