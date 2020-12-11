<template>
    <div class="editor">
        <input type="file" @input="readFile" />
        <div v-if="game">
            <div>
                <a :href="link" download="data.json">
                    <el-button icon="el-icon-download" circle />
                </a>
                <el-button
                    icon="el-icon-setting"
                    circle
                    @click="showMenu = true"
                />
            </div>
            <database v-if="showMenu" :game="game" />
            <div v-else class="map-editor">
                <div>
                    <tilesets class="tilesets" @input="val => tile = val" />
                    <ul>
                        <li v-for="map in game.getMaps()" :key="map.name">
                            {{ map.name }}
                        </li>
                    </ul>
                </div>
                <tile-map
                    :map="game.getMap(selectedMap)"
                    :tile="tile"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    import Database from '@/components/database/Database';
    import TileMap from '@/components/map/TileMap';
    import Tilesets from '@/components/map/Tilesets';
    import File from '@/mixins/File';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'App',
        components: {
            Database,
            TileMap,
            Tilesets,
            'el-button': Button,
        },
        mixins: [File],
        data () {
            return {
                game: null,
                selectedMap: 0,
                showMenu: false,
                tile: null,
            };
        },
        computed: {
            link () {
                let csvContent = 'data:text/csv;charset=utf-8,' + JSON.stringify(this.game.getData(), null, 4);
                return encodeURI(csvContent);
            },
        },
        methods: {
            fileOnLoad (data) {
                this.game = new GameModel(JSON.parse(data));
            },
        },
    };
</script>
