<template>
  <div class="main">
    <div class="header">
      <!-- TODO: Add Name and maybe nav -->
      <div class="header-text">CronJobBob</div>
    </div>
    <div class="task-header">Tasks</div>
    <div class="content-container">
      <div class="task-container">
        <!-- TODO: add list of all tasks -->
        <template v-for="(tasks,index) in this.tasks">
          <RetroCard :data="tasks" :index="index" :key="index" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import RetroCard from "./components/RetroCard";
export default {
  name: "app",
  components: { Prism, RetroCard },
  data() {
    return {
      tasks: [
        {
          name: "Return Num",
          command: "var test= 2; let hello =2",
          description: `This is an example cron job to do a job that is good`,
          lastRan: "Thu Dec 05 2019 12:36:35 GMT-0700 (Mountain Standard Time)",
          enabled: "true",
          id: 1
        },
        {
          name: "Run PI",
          command: "var test = 2",
          description: `This is an example cron job to do a job that is good`,
          lastRan: "Thu Dec 05 2019 12:36:35 GMT-0700 (Mountain Standard Time)",
          enabled: false,
          id: 2
        },
        {
          name: "test",
          command: "var test = 200",
          description: `This is an example cron job to do a job that is good`,
          lastRan: "Thu Dec 05 2019 12:36:35 GMT-0700 (Mountain Standard Time)",
          enabled: true,
          id: 3
        }
      ]
    };
  },
  methods: {},

  mounted() {},
  created() {}
};
</script>

<style lang="scss">
@import "../node_modules/nes.css/css/nes.css";

body {
  margin: 0px;
  font-family: "Press Start 2P", cursive;
}

.content-container {
  display: flex;
  max-width: 1200px;
  margin: auto;
}

.main {
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 20vh;
}

.header {
  display: grid;
  background-color: whitesmoke;
}

.header-text {
  margin: auto;
  font-size: 8vw;
}

.task-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  width: 100vw;
  grid-gap: 0px;
}

.task-header {
  font-size: 5vw;
  margin: auto;
}
</style>
