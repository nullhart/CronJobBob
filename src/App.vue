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

        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="taskCard nes-container is-rounded is-dark"
        >
          <span style="grid-area:a">
            <h3>{{task.name}}</h3>
          </span>
          <span style="grid-area:b" class="taskDescription">{{task.description}}</span>
          <button style="grid-area:c;" class="nes-btn is-success">Run</button>
          <button
            type="button"
            class="nes-btn is-normal"
            @click="openDialog('dialog-' + index)"
          >Edit</button>
          <dialog class="nes-dialog" :id="'dialog-' + index">
            <form method="dialog">
              <p class="title">
                <span class="underline">Name</span>:
                <span>{{task.name}}</span>
              </p>
              <p>
                <span class="taskDescriptionDetails">{{task.description}}</span>
              </p>
              <prism language="js" style="background-color: #272822">{{task.command}}</prism>
              <menu class="dialog-menu">
                <button class="nes-btn">Cancel</button>
                <button class="nes-btn is-primary">Confirm</button>
              </menu>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./prism";
import "./prism.css";
import Prism from "vue-prism-component";

export default {
  name: "app",
  components: { Prism },
  data() {
    return {
      tasks: [
        {
          name: "Return Num",
          command: "var test= 2; le hello =2",
          description: `This is an example cron job to do a job that is good`,
          enabled: "true",
          id: 1
        },
        {
          name: "Run PI",
          command: "var test = 2",
          description: `This is an example cron job to do a job that is good`,
          enabled: false,
          id: 2
        },
        {
          name: "test",
          command: "var test = 200",
          description: `This is an example cron job to do a job that is good`,
          enabled: true,
          id: 3
        }
      ]
    };
  },
  methods: {
    format: function(code) {
      var code = prettier.format(code, {
        parser: "babylon",
        plugins: prettierPlugins
      });
      console.log(code);
      return code;
    },
    openDialog: function(element) {
      document.getElementById(element).showModal();
    }
  },
  watch: {
    tasks: function() {
      this.tasks;
      console.log(this.tasks);
    }
  },
  created() {
    this.tasks.forEach(task => {
      try {
        task.command = this.format(task.command);
      } catch (error) {
        task.command = error;
      }
    });
  }
};
</script>

<style lang="scss">
@import "../node_modules/nes.css/css/nes.css";

.underline {
  text-decoration: underline;
}

.taskDescriptionDetails {
  font-size: 0.8em;
  color: gray;
}

.content-container {
  display: flex;
  max-width: 1200px;
  margin: auto;
}

.taskCard {
  display: grid;
  justify-self: center;
  width: 350px;
  height: 250px;

  min-width: 350px;
  min-height: 250px;

  max-width: 350px;
  max-height: 250px;

  border-radius: 15px;
  grid-template-rows: 45px 1fr 55px;
  grid-template-areas:
    "a a"
    "b b"
    "c d ";
}

body {
  margin: 0px;
  font-family: "Press Start 2P", cursive;
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

.list-divider {
  border-top: 1px solid black;
}

.task-header {
  font-size: 5vw;
  margin: auto;
}
</style>
