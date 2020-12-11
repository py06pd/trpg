<template>
    <span
        :class="icon"
        :title="title"
        class="icon"
        tabindex="0"
        @click="clicked"
        @keyup.enter="clicked"
    >
    </span>
</template>

<script>
    export default {
        name: 'IconButton',
        props: {
            icon: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: null,
            },
        },
        methods: {
            clicked () {
                this.$emit('click');
            },
        },
    };
</script>
