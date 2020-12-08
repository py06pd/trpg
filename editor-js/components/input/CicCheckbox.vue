<template>
    <span
        :class="{'disabled': !enabled, 'selected': value }"
        class="cic-checkbox checkbox"
        @click="clicked"
    ></span>
</template>

<script>
    export default {
        name: 'CicCheckbox',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            enabled: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            // Handles the control being clicked
            clicked () {
                if (this.enabled) {
                    let selected = !this.value;
                    this.$emit('click', selected);
                    this.$emit('input', selected);
                }
            },
        },
    };
</script>
