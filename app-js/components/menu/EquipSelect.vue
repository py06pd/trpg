<template>
    <div class="menu-panel" style="padding: 10px 0; width: 218px">
        <div>{{ equipSlot }}</div>
        <table>
            <tr
                v-for="(option, optionIndex) in options"
                :key="optionIndex"
                :class="{ 'hover': index == optionIndex }"
                @mouseenter="hover(optionIndex)"
                @click="confirm"
            >
                <td class="cell-first" style="width: 34px">
                    <span v-if="option.getIcon()" :class="'icon icon' + option.getIcon()" />
                </td>
                <td class="cell-last"><span>{{ option.getLabel() }}</span></td>
            </tr>
        </table>
    </div>
</template>

<script>
import Gear from '../../model/gear';

export default {
    name: 'EquipSelect',
    props: {
        equipSlot: {
            type: String,
            required: true,
        },
        inventory: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            index: 0,
        };
    },
    computed: {
        options () {
            return [new Gear({ name: '[None]' })].concat(this.inventory);
        },
    },
    methods: {
        change (increment) {
            let index = this.index + increment;
            if (this.index < 0) {
                index = this.inventory.length;
            }
            if (this.index === this.inventory.length + 1) {
                index = 0;
            }
            
            this.hover(index);
        },

        confirm () {
            this.$emit('change', this.index == 0 ? null : this.inventory[this.index - 1]);
        },

        hover (index) {
            this.index = index;
            this.$emit('input', this.index == 0 ? null : this.inventory[this.index - 1]);
        },

        handleInput (input) {
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
        },
    },
};
</script>
