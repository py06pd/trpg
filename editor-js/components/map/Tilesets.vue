<template>
    <el-tabs type="border-card">
        <el-tab-pane
            v-for="tileSet in tileSets"
            :key="tileSet.name"
            :label="tileSet.name"
        >
            <div
                v-for="set in tileSet.sets"
                :key="set.image"
                :style="{ 'background': 'url(images/tilesets/' + set.image + ')', 'height': (32 * set.height) + 'px', 'width': (32 * set.width) + 'px' }"
            ></div>
            <ul class="grid">
                <li v-for="a in tileSet.sets.reduce((t, x) => t + x.height, 0)" :key="a">
                    <ul>
                        <li
                            v-for="b in 16"
                            :key="a + '|' + b"
                            @mouseenter="setCursor(b, a)"
                            @click="confirm"
                        >
                            <div v-if="cursor.x === b && cursor.y === a" class="cursor"></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';

    export default {
        name: 'Tilesets',
        components: {
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        data () {
            return {
                cursor: { x: 0, y: 0 },
                selectedSet: 'World A',
                tileSets: [
                    {
                        name: 'World A',
                        sets: [
                            {
                                image: 'World_A1.png',
                                height: 12,
                                width: 16,
                            },
                            {
                                image: 'World_A2.png',
                                height: 12,
                                width: 16,
                            },
                        ],
                    },
                    {
                        name: 'World B',
                        sets: [
                            {
                                image: 'World_B.png',
                                height: 16,
                                width: 16,
                            },
                        ],
                    },
                ],
            };
        },
        methods: {
            confirm () {
                let totalHeight = 0;
                let data = { image: null, x: this.cursor.x, y: 0 };
                this.tileSets.find(x => x.name === this.selectedSet).sets.forEach(x => {
                    if (totalHeight <= this.cursor.y && totalHeight + x.height > this.cursor.y) {
                        data.image = x.image;
                        data.y = this.cursor.y - totalHeight;
                    }

                    totalHeight += x.height;
                });
                this.$emit('input', data);
            },

            handleInput (input) {
                if (input.up() && this.cursor.y > 0) {
                    this.setCursor(this.cursor.x, this.cursor.y - 1);
                }
                if (input.down() && this.cursor.y < this.map.length) {
                    this.setCursor(this.cursor.x, this.cursor.y + 1);
                }
                if (input.left() && this.cursor.x > 0) {
                    this.setCursor(this.cursor.x - 1, this.cursor.y);
                }
                if (input.right() && this.cursor.x < this.map[0].length) {
                    this.setCursor(this.cursor.x + 1, this.cursor.y);
                }
                if (input.confirm()) {
                    this.confirm();
                }
            },

            setCursor (x, y) {
                this.cursor = { x: x, y: y };
            },
        },
    };
</script>
