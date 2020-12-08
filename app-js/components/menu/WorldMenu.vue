<template>
    <div id="mainMenu">
        <ul class="menu-panel">
            <li
                v-for="(option, optionIndex) in options"
                :key="optionIndex"
                :class="{ 'hover': index === optionIndex, 'selected': selected === optionIndex }"
                @mouseenter="index = optionIndex"
                @click="selected = optionIndex"
            >
                {{ option }}
            </li>
        </ul>
        <status-menu v-if="selected === 0" :player="player" />
        <status-menu
            v-if="selected === 1"
            ref="menu"
            :player="player"
            @blur="selected = null"
        />
        <equip-menu
            v-if="selected === 2"
            ref="menu"
            :player="player"
            @blur="selected = null"
        />
        <status-menu v-if="selected === 3" :player="player" />
        <status-menu v-if="selected === 4" :player="player" />
    </div>
</template>

<script>
import EquipMenu from './EquipMenu.vue';
import StatusMenu from './StatusMenu.vue';
import Player from '../../model/player';

export default {
    name: 'WorldMenu',
    components: {
        EquipMenu,
        StatusMenu,
    },
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    data () {
        return {
            index: 0,
            options: ['Quests', 'Status', 'Equip', 'Skills', 'Items'],
            selected: null,
        };
    },
    methods: {
        change (increment) {
            this.index = this.index + increment;
            if (this.index < 0) {
                this.index = this.options.length - 1;
            }
            if (this.index === this.options.length) {
                this.index = 0;
            }
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
                    this.selected = this.index;
                }
            } else {
                this.$refs['menu'].handleInput(input);
            }
        },
    },
};
</script>
