<template>
    <div class="cic-textbox">
        <el-input
            v-if="enabled"
            :value="value"
            v-bind="Object.assign(JSON.parse(JSON.stringify($attrs)), { id : null })"
            @input="val => $emit('input', parseValue(val))"
            @change="val => $emit('change', parseValue(val))"
            @blur="val => $emit('blur', parseValue(val))"
        />
        <span v-else>{{ value }}</span>
    </div>
</template>

<script>
    import { Input } from 'element-ui';

    export default {
        name: 'CicTextbox',
        components: {
            'el-input': Input,
        },
        props: {
            value: {
                type: [String, Number],
                default: null,
            },
            enabled: {
                type: Boolean,
                default: true,
            },
            intOnly: {
                type: Boolean,
                default: false,
            },
            floatOnly: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            parseValue (value) {
                if (this.floatOnly) {
                    if (isNaN(value)) {
                        return '';
                    }

                    value = parseFloat(value);
                }

                if (this.intOnly) {
                    if (value && !/^\d+$/.test(value)) {
                        return '';
                    }

                    value = parseInt(value);
                }

                return value;
            },
        },
    };
</script>
