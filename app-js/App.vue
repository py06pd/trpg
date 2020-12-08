<template>
    <div>
        <world-menu
            v-if="showMenu"
            ref="worldMenu"
            :player="player"
            @blur="showMenu = false"
        />
        <battle-map
            ref="battleMap"
            :player="player"
            :map="map"
            @blur="openMenu"
        />
    </div>
</template>

<script>
import BattleMap from './components/battle/BattleMap.vue';
import WorldMenu from './components/menu/WorldMenu.vue';
import Input from './model/input';
import Player from './model/player';
import data from './data.json';

export default {
    name: 'App',
    components: {
        BattleMap,
        WorldMenu,
    },
    data () {
        return {
            input: null,
            map: data.maps[0],
            player: null,
            showMenu: null,
        };
    },
    created () {
        this.player = new Player();
        this.player.load(data);

        this.input = new Input();
    },
    methods: {
        handleInput (evt) {
            this.input.handleInput(evt.key);
            if (this.showMenu) {
                this.$refs['worldMenu'].handleInput(this.input);
            } else {
                this.$refs['battleMap'].handleInput(this.input);
            }
        },

        openMenu () {
            console.log(1);
            this.showMenu = true;
        },
    },
};
</script>
