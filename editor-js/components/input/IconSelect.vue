<template>
    <div class="icon-select">
        <div
            :style="{ height: size + 'px', width: size + 'px' }"
            class="preview"
            @click="showSelect = !showSelect"
        >
            <div v-if="value !== null" :style="previewStyle"></div>
        </div>
        <div v-if="enabled && showSelect" class="cic-popup">
            <el-tabs v-model="selectedSet" type="border-card">
                <el-tab-pane
                    v-for="iconSet in iconSets"
                    :key="iconSet.name"
                    :label="iconSet.name"
                    :name="iconSet.name"
                >
                    <div :style="{ 'background': 'url(images/icons/' + iconSet.image + ')', 'height': '792px', 'width': '384px' }"></div>
                    <ul class="grid">
                        <li v-for="a in 33" :key="a">
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
        </div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';

    export default {
        name: 'IconSelect',
        components: {
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        props: {
            enabled: {
                type: Boolean,
                default: true,
            },
            size: {
                type: Number,
                default: 24,
            },
            value: {
                type: Number,
                default: null,
            },
        },
        data () {
            return {
                cursor: { x: 0, y: 0 },
                selectedSet: 'Icons 1',
                showSelect: false,
                iconSets: [
                    {
                        name: 'Icons 1',
                        image: 'IconSet.png',
                    },
                    {
                        name: 'Icons 2',
                        image: 'IconSet2.png',
                    },
                    {
                        name: 'Icons 3',
                        image: 'IconSet3.png',
                    },
                    {
                        name: 'Icons 4',
                        image: 'IconSet4.png',
                    },
                    {
                        name: 'Icons 5',
                        image: 'IconSet5.png',
                    },
                ],
            };
        },
        computed: {
            previewStyle () {
                let set = Math.floor((this.value - 1) / 272);
                let offsetX = (((this.value - 1) % 16) * -this.size).toString();
                let offsetY = (Math.floor((this.value - 1 - (set * 272)) / 16) * -this.size).toString();
                return {
                    backgroundImage: 'url(images/icons/' + this.iconSets[set].image + ')',
                    backgroundPosition: offsetX + 'px ' + offsetY + 'px',
                    backgroundSize: (this.size * 16) + 'px ' + (this.size * 33) + 'px',
                    height: this.size + 'px',
                    width: this.size + 'px',
                };
            },
        },
        methods: {
            confirm () {
                this.showSelect = false;
                let set = this.faceSets.findIndex(x => x.name === this.selectedSet);
                this.$emit('input', (set * 272) + ((this.cursor.y - 1) * 16) + this.cursor.x);
            },

            setCursor (x, y) {
                this.cursor = { x: x, y: y };
            },
        },
    };
</script>
