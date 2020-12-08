<template>
    <div class="cic-select">
        <el-select
            v-if="enabled"
            :value="value"
            v-bind="Object.assign(JSON.parse(JSON.stringify($attrs)), { id : null })"
            filterable
            @change="handleChange"
            @input="handleInput"
        >
            <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
            />
        </el-select>
        <span v-else-if="Array.isArray(value)">{{ options.filter(x => value.indexOf(x.value) >= 0).map(x => x.label).join(', ') }}</span>
        <span v-else>{{ options.find(x => x.value === value) ? options.find(x => x.value === value).label : value }}</span>
    </div>
</template>

<script>
    import {Select, Option} from 'element-ui';
    
    export default {
        name: 'CicSelect',
        components: {
            'el-select': Select,
            'el-option': Option,
        },
        props: {
            value: {
                type: [Number, String, Array],
                default: null,
            },

            options: {
                type: Array,
                required: true,
            },

            defaultWhenSingleOption: {
                type: Boolean,
                default: false,
            },

            enabled: {
                type: Boolean,
                default: true,
            },
        },
        created () {
            this.setDefaultValue();
        },
        methods: {
            handleChange (value) {
                this.$emit('change', value);
            },

            handleInput (value) {
                this.$emit('input', value);
            },

            setDefaultValue () {
                if (this.options.length === 1 && this.defaultWhenSingleOption) {
                    let optionValue = this.options[0].value;
                    if (this.value !== optionValue) {
                        this.$emit('input', optionValue);
                        this.$emit('change', optionValue);
                    }
                }
            },
        },
    };
</script>
