<template>
    <div class="face-select">
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
                    v-for="faceSet in faceSets"
                    :key="faceSet.name"
                    :label="faceSet.name"
                    :name="faceSet.name"
                >
                    <div :style="{ 'background': 'url(images/faces/' + faceSet.image + ')', 'height': '192px', 'width': '384px' }"></div>
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
        name: 'FaceSelect',
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
                default: 96,
            },
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
                faceSets: [
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
                        name: 'Monster 1',
                        image: 'Monster1.png',
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
                    {
                        name: 'People 4',
                        image: 'People4.png',
                    },
                    {
                        name: 'Spiritual',
                        image: 'Spiritual.png',
                    },
                ],
            };
        },
        computed: {
            previewStyle () {
                let offsetX = (((this.value - 1) % 4) * -this.size).toString();
                let offsetY = (((this.value - 1) % 8) > 3 ? -this.size : 0).toString();
                return {
                    backgroundImage: 'url(images/faces/' + this.faceSets[Math.floor((this.value - 1) / 8)].image + ')',
                    backgroundPosition: offsetX + 'px ' + offsetY + 'px',
                    backgroundSize: (this.size * 4) + 'px ' + (this.size * 2) + 'px',
                    height: this.size + 'px',
                    width: this.size + 'px',
                };
            },
        },
        methods: {
            confirm () {
                this.showSelect = false;
                let set = this.faceSets.findIndex(x => x.name === this.selectedSet);
                this.$emit('input', (set * 8) + ((this.cursor.y - 1) * 4) + this.cursor.x);
            },

            setCursor (x, y) {
                this.cursor = { x: x, y: y };
            },
        },
    };
</script>
