<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Tab',
    props: {
        title: { required: true },
        selected: { default: false}
    },

    data() {

        return {
            isActive: false
        };

    },

    computed: {

        href() {
            return '#' + this.title.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {

        this.isActive = this.selected;

    }
}
</script>
