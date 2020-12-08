<template>
    <ul>
        <li
            v-for="(option, optionIndex) in Object.values(options)"
            :key="optionIndex"
            :class="{ 'hover': index === optionIndex, 'selected': selected === optionIndex }"
            @mouseenter="index = optionIndex"
            @click="confirm"
        >
            {{ option }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'BattleMenu',
    data () {
        return {
            index: 0,
            options: {
                move: 'Move',
                attack: 'Attack',
                skill: 'Skill',
                endTurn: 'End Turn',
            },
            selected: null,
        };
    },
    methods: {
        change (increment) {
            this.index = this.index + increment;
            if (this.index < 0) {
                this.index = Object.values(this.options).length - 1;
            }
            if (this.index === Object.values(this.options).length) {
                this.index = 0;
            }
        },

        confirm () {
            this.selected = this.index;
            this.$emit('change', Object.keys(this.options)[this.selected]);
        },
        
        handleInput (input) {
            if (this.selected === null) {
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
