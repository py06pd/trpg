<template>
    <div>
        <div>
            <div class="column">
                <info-panel :character="character" />
                <attribute-panel
                    :character="character"
                    :gear="gear"
                    :equip-slot="slot"
                />
            </div>
            <div class="column">
                <equip-select
                    v-if="slot"
                    ref="equipSelect"
                    :equip-slot="slot"
                    :inventory="inventory"
                    @input="val => gear = val"
                    @change="confirm"
                    @blur="slot = null"
                />
                <equip-panel
                    v-else
                    ref="equipPanel"
                    :enabled="true"
                    :character="character"
                    @input="val => gear = val"
                    @change="val => slot = val"
                    @blur="$emit('blur')"
                />
                <equip-skill-panel :character="character" :gear="gear" />
            </div>
        </div>
    </div>
</template>

<script>
import AttributePanel from './AttributePanel.vue';
import EquipPanel from './EquipPanel.vue';
import EquipSelect from './EquipSelect.vue';
import EquipSkillPanel from './EquipSkillPanel.vue';
import InfoPanel from './InfoPanel.vue';
import Player from '../../model/player';

export default {
    name: 'EquipMenu',
    components: {
        AttributePanel,
        EquipPanel,
        EquipSelect,
        EquipSkillPanel,
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
            gear: null,
            index: 0,
            slot: null,
        };
    },
    computed: {
        character () {
            return this.player.party[this.index];
        },

        inventory () {
            return this.player.inventory.filter(x => x.canEquip(this.slot) &&
                this.character.getJob().canEquip(x.getGearType()));
        },
    },
    methods: {
        confirm () {
            this.player.party[this.index].setGear(this.slot, this.gear);
            this.slot = null;
        },

        handleInput (input) {
            if (input.next()) {
                this.slot = null;
                this.index = this.index + 1;
                if (this.index === this.player.party.length) {
                    this.index = 0;
                }
            }
            if (input.previous()) {
                this.slot = null;
                this.index = this.index - 1;
                if (this.index < 0) {
                    this.index = this.player.party.length - 1;
                }
            }

            if (this.slot) {
                this.$refs['equipSelect'].handleInput(input);
            } else {
                this.$refs['equipPanel'].handleInput(input);
            }
        },
    },
};
</script>
