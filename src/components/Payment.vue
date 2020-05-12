<template>
    <el-tabs v-model="payment" @tab-click="handleClick">
        <el-tab-pane label="sepa" name="sepa">
            User
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">
            Config
        </el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'Payment',
    data() {
        return {
            payment: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
