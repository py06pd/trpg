<template>
    <ul class="grid">
        <li v-for="(row, rowIndex) in map.getCells()" :key="rowIndex">
            <ul>
                <li
                    v-for="(cell, cellIndex) in row"
                    :key="rowIndex + '|' + cellIndex"
                    :style="{ 'background': map.getTileBackground(cellIndex, rowIndex) }"
                    @mouseenter="setCursor(cellIndex, rowIndex)"
                    @click="confirm"
                >
                    <div v-if="cursor.x === cellIndex && cursor.y === rowIndex" class="cursor"></div>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import MapModel from '@/models/MapModel';

    export default {
        name: 'TileMap',
        props: {
            map: {
                type: MapModel,
                required: true,
            },
            tile: {
                type: Object,
                default: () => {
                    return null;
                },
            },
        },
        data () {
            return {
                cursor: { x: 0, y: 0 },
            };
        },
        methods: {
            confirm () {
                this.map.setTile(this.cursor.x, this.cursor.y, this.tile);
            },

            setCursor (x, y) {
                this.cursor = { x: x, y: y };
            },
        },
    };
</script>
