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
                            {{ $t('Skill Name') }}
                        </li>
                        <li><cic-textbox :value="item.getSkill()" @input="val => item.setSkill(val)" /></li>
                        <li class="form-label">
                            {{ $t('Promotions') }}
                        </li>
                        <li>
                            <cic-select
                                :value="item.getPromotions()"
                                :options="game.getJobs().filter(x => x.getId() !== item.getId()).map(x => { return { value: x.getId(), label: x.getName() }; })"
                                multiple
                                @input="val => item.setPromotions(val)"
                            />
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane :label="$t('Gear Types')" name="gearTypes">
                    <gear-types-tab :item="item" :game="game" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="cic-overlay" @click="$emit('blur')"></div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';
    import GearTypesTab from '@/components/database/tabs/GearTypesTab';
    import CicSelect from '@/components/input/CicSelect';
    import CicTextbox from '@/components/input/CicTextbox';
    import GameModel from '@/models/GameModel';
    import JobModel from '@/models/JobModel';

    export default {
        name: 'EditJob',
        components: {
            GearTypesTab,
            CicSelect,
            CicTextbox,
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        props: {
            game: {
                type: GameModel,
                required: true,
            },
            item: {
                type: JobModel,
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
