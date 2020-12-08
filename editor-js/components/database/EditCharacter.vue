<template>
    <div>
        <div class="cic-popup">
            <el-tabs v-model="selectedSection" type="border-card">
                <el-tab-pane :label="$t('Details')" name="details">
                    <ul>
                        <li class="form-label-first">
                            {{ $t('Name') }}
                        </li>
                        <li><cic-textbox :value="item.getName()" @input="val => item.setName(val)" /></li>
                        <li class="form-label">
                            {{ $t('Job') }}
                        </li>
                        <li>
                            <cic-select
                                :value="item.getJob()"
                                :options="game.getJobs().map(x => { return { value: x.getId(), label: x.getName() }; })"
                                :placeholder="$t('Please select...')"
                                clearable
                                @input="val => item.setJob(val)"
                            />
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane :label="$t('Graphics')" name="graphics">
                    <graphics-tab :item="item" />
                </el-tab-pane>
                <el-tab-pane :label="$t('Attributes')" name="attributes">
                    <attributes-tab :item="item" :game="game" />
                </el-tab-pane>
                <el-tab-pane :label="$t('Initial Gear')" name="initialGear">
                    <initial-gear-tab
                        v-if="item.getJob()"
                        :item="item"
                        :game="game"
                        :type-source="game.getJobs().find(x => item.getJob() === x.getId())"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="cic-overlay" @click="$emit('blur')"></div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';
    import AttributesTab from '@/components/database/tabs/AttributesTab';
    import GraphicsTab from '@/components/database/tabs/GraphicsTab';
    import InitialGearTab from '@/components/database/tabs/InitialGearTab';
    import CicSelect from '@/components/input/CicSelect';
    import CicTextbox from '@/components/input/CicTextbox';
    import CharacterModel from '@/models/CharacterModel';
    import GameModel from '@/models/GameModel';

    export default {
        name: 'EditCharacter',
        components: {
            CicSelect,
            CicTextbox,
            AttributesTab,
            GraphicsTab,
            InitialGearTab,
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: CharacterModel,
                required: true,
            },
        },
        data () {
            return {
                selectedSection: 'details',
            };
        },
    };
</script>
