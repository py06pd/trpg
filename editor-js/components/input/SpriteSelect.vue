<template>
    <div class="sprite-select">
        <div class="preview" @click="showSelect = !showSelect">
            <div
                v-if="value"
                :style="{ 'background': 'url(images/sprites/' + spriteSets[Math.ceil((value - 1) / 8)].image + ') ' + ((((value - 1) % 4) * -96) - 32).toString() + 'px ' + (((value - 1) % 8) > 3 ? '-128px' : '0px'), 'height': '32px', 'width': '32px' }"
            >
            </div>
        </div>
        <div v-if="showSelect" class="cic-popup">
            <el-tabs v-model="selectedSet" type="border-card">
                <el-tab-pane
                    v-for="spriteSet in spriteSets"
                    :key="spriteSet.name"
                    :label="spriteSet.name"
                    :name="spriteSet.name"
                >
                    <div :style="{ 'background': 'url(images/sprites/' + spriteSet.image + ')', 'height': '256px', 'width': '384px' }"></div>
                    <ul class="grid">
                        <li v-for="a in 2" :key="a">
                            <ul>
                                <li
                                    v-for="b in 4"
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
        </div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';

    export default {
        name: 'SpriteSelect',
        components: {
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        props: {
            value: {
                type: Number,
                default: null,
            },
        },
        data () {
            return {
                cursor: { x: 0, y: 0 },
                selectedSet: 'Actor 1',
                showSelect: false,
                spriteSets: [
                    {
                        name: 'Actor 1',
                        image: 'Actor1.png',
                    },
                    {
                        name: 'Actor 2',
                        image: 'Actor2.png',
                    },
                    {
                        name: 'Actor 3',
                        image: 'Actor3.png',
                    },
                    {
                        name: 'Actor 4',
                        image: 'Actor4.png',
                    },
                    {
                        name: 'Actor 5',
                        image: 'Actor5.png',
                    },
                    {
                        name: 'Evil',
                        image: 'Evil.png',
                    },
                    {
                        name: 'People 1',
                        image: 'People1.png',
                    },
                    {
                        name: 'People 2',
                        image: 'People2.png',
                    },
                    {
                        name: 'People 3',
                        image: 'People3.png',
                    },
                ],
            };
        },
        methods: {
            confirm () {
                this.showSelect = false;
                let set = this.spriteSets.findIndex(x => x.name === this.selectedSet);
                this.$emit('input', (set * 8) + ((this.cursor.y - 1) * 4) + this.cursor.x);
            },

            setCursor (x, y) {
                this.cursor = { x: x, y: y };
            },
        },
    };
</script>
