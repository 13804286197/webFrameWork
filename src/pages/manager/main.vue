<template>
    <div>
      <v-header-menu index="1"></v-header-menu>
      <el-container>
        <el-aside width="250px" >
          <v-left-menu index="1-1" module="1" @goTo="handletabs"></v-left-menu>
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" editable="true" >
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
</template>

<style>
    body {
        background-color: white;
    }
</style>

<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 1,
      }
    },
    methods: {
      handletabs(component,title, action) {

        alert(component+":"+action);
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: title,
            name: newTabName,
            content: component
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>
