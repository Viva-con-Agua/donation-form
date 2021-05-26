<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :key="tab.id" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.title }}</a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tabs',
    data() {
        return {tabs: [] };
    },
    
    created() {
        
        this.tabs = this.$children;
        
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.title == selectedTab.title);
            });
        }
    }
}
</script>
<style>
.tabs {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
ul li {
    list-style: none;
}
/* Style the buttons inside the tab */
.tabs li {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tabs li:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tabs li.is-active {
  background-color: #ccc;
}
</style>
