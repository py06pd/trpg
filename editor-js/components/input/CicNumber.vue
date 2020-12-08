<template>
    <div class="cic-number">
        <el-input-number
            v-if="enabled"
            :value="value"
            :precision="precision"
            v-bind="Object.assign(JSON.parse(JSON.stringify($attrs)), { id : null })"
            @input="val => $emit('input', val)"
            @change="val => $emit('change', val)"
            @blur="val => $emit('blur', val)"
        />
        <span v-else>{{ parseFloat(value).toFixed(precision) }}</span>
    </div>
</template>

<script>
    import { InputNumber } from 'element-ui';

    export default {
        name: 'CicNumber',
        components: {
            'el-input-number': InputNumber,
        },
        props: {
            enabled: {
                type: Boolean,
                default: true,
            },
            precision: {
                type: Number,
                default: 0,
            },
            value: {
                type: Number,
                default: null,
            },
        },
    };
</script>
