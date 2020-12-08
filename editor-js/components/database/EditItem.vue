<template>
    <div>
        <div class="cic-popup">
            <el-tabs v-model="selectedSection" type="border-card">
                <el-tab-pane :label="$t('Details')" name="details">
                    <ul>
                        <li class="form-item-label">
                            {{ $t('Name') }}
                        </li>
                        <li><cic-textbox :value="item.getName()" @input="val => item.setName(val)" /></li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="cic-overlay" @click="$emit('blur')"></div>
    </div>
</template>

<script>
    import { Tabs, TabPane } from 'element-ui';
    import CicTextbox from '@/components/input/CicTextbox';
    import ItemModel from '@/models/ItemModel';

    export default {
        name: 'EditItem',
        components: {
            CicTextbox,
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
        },
        props: {
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
