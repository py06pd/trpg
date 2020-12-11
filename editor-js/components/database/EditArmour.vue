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
                            {{ $t('Armour Type') }}
                        </li>
                        <li>
                            <cic-select
                                :value="item.getGearType()"
                                :options="game.getArmourTypes().map(x => { return { value: x, label: x }; })"
                                @input="val => item.setGearType(val)"
                            />
                        </li>
                        <li class="form-label">
                            {{ $t('Slots') }}
                        </li>
                        <li>
                            <cic-select
                                :value="item.getSlots()"
                                :options="game.getEquipSlots().map(x => { return { value: x, label: $t(x + '_label') }; })"
                                multiple
                                @input="val => item.setSlots(val)"
                            />
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane :label="$t('Attributes')" name="attributes">
                    <attribute-modifiers-tab :item="item" :game="game" />
                </el-tab-pane>
                <el-tab-pane :label="$t('Learn Skills')" name="learning">
                    <learning-tab :item="item" :game="game" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="cic-overlay" @click="$emit('blur')"></div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';
    import AttributeModifiersTab from '@/components/database/tabs/AttributeModifiersTab';
    import LearningTab from '@/components/database/tabs/LearningTab';
    import CicSelect from '@/components/input/CicSelect';
    import CicTextbox from '@/components/input/CicTextbox';
    import GameModel from '@/models/GameModel';
    import ItemModel from '@/models/ItemModel';

    export default {
        name: 'EditArmour',
        components: {
            AttributeModifiersTab,
            LearningTab,
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
                type: ItemModel,
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
