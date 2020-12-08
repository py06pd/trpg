<template>
    <div>
        <div>
            <div id="map">
                <tile-map :battle="battle" />
            </div>
            <div id="queue">
                <ul v-if="battle.action !== 'setup' && battle.action !== 'menu'">
                    <li v-for="battler in battle.battlers" :key="battler.character.getName()">
                        <div :class="'battler battler' + battler.character.getSprite()" />
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <div id="profiles">
                <battle-profile :character="battle.active().character" />
                <battle-profile v-if="battle.action !== 'setup' && battle.target" :character="battle.target" />
            </div>
            <div id="menu">
                <battle-menu
                    v-if="battle.action === null"
                    ref="battleMenu"
                    @change="val => battle.action = val" />
            </div>
        </div>
    </div>
</template>

<script>
import BattleProfile from './BattleProfile.vue';
import TileMap from './TileMap.vue';
import BattleMenu from './menu/BattleMenu.vue';
import BattleController from '../../controller/battleController';
import Player from '../../model/player';

export default {
    name: 'BattleMap',
    components: {
        BattleMenu,
        BattleProfile,
        TileMap,
    },
    props: {
        map: {
            type: Object,
            required: true,
        },
        player: {
            type: Player,
            required: true,
        },
    },
    data () {
        return {
            battle: null,
        };
    },
    created () {
        this.battle = new BattleController(this.player.party, this.map.map);
    },
    methods: {
        handleInput (input) {
            if (this.battle.action === 'setup' && input.cancel()) {
                this.$emit('blur');
            } else if (this.battle.action === null) {
                this.$refs['battleMenu'].handleInput(input);
            } else {
                this.battle.handleInput(input);
            }
        },
    },
};
</script>
