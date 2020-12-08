<template>
    <div>
        <div>
            <div class="column">
                <info-panel :character="character" />
                <attribute-panel :character="character" />
            </div>
            <div class="column">
                <div class="menu-panel">
                    <table>
                        <tr>
                            <td style="padding-right: 10px">Overdrive</td>
                            <td style="vertical-align: middle">
                                <div class="bar-back">
                                    <div :style="{ width: (100 - character.getAttribute('lp').getValue()) + 'px' }" />
                                </div>
                            </td>
                        </tr>
                        <tr><td>EXP</td><td>{{ character.getAttribute('exp').getValue() }}</td></tr>
                        <tr><td>Next Lv</td><td>{{ character.toNextLevel() }}</td></tr>
                    </table>
                </div>
                <equip-panel :character="character" />
            </div>
        </div>
    </div>
</template>

<script>
import AttributePanel from './AttributePanel.vue';
import EquipPanel from './EquipPanel.vue';
import InfoPanel from './InfoPanel.vue';
import Player from '../../model/player';

export default {
    name: 'StatusMenu',
    components: {
        AttributePanel,
        EquipPanel,
        InfoPanel,
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
        };
    },
    computed: {
        character () {
            return this.player.party[this.index];
        },
    },
    methods: {
        handleInput (input) {
            if (input.cancel()) {
                this.$emit('blur');
            }
            if (input.next()) {
                this.index = this.index + 1;
                if (this.index === this.player.party.length) {
                    this.index = 0;
                }
            }
            if (input.previous()) {
                this.index = this.index - 1;
                if (this.index < 0) {
                    this.index = this.player.party.length - 1;
                }
            }
        },
    },
};
</script>
