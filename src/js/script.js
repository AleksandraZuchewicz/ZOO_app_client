let zooBox = Vue.component("zoo-box", {
  props: ["title"],
  template: `
    <span>{{ title }}</span>
    `
});
let zooLogs = Vue.component("zoo-logs", {
  template: `
      <span class="text-center">futureLogs</span>
      `
});
var app = new Vue({
  el: "#app",
  data: {
    zooTitle: "ZOO!",
    employee: "Employee",
    animal: "Animal",
    food: "Food"
  },
  components: {
    zooBox: zooBox,
    zooLogs: zooLogs
  }
});
