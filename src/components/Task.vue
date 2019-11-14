<template>
  <div class="task">
    <el-switch
      v-model="task.enabled"
      class="task-status"
      active-color="green"
      inactive-color="red"
      active-value="true"
      inactive-value="false"
    ></el-switch>

    <div class="task-info">
      <span>{{task.name}} {{task.enabled}}</span>
      <span>{{task.command}}</span>
    </div>
    <div class="task-actions">
      <button class="edit-button">edit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskData"],
  data() {
    return {
      task: this.taskData,
      test: true
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.task {
  display: grid;
  grid-template-columns: 50px calc(100% - 100px) 50px;
  width: 100%;
  height: 50px;
  //   background: whitesmoke;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 4px #00000050;
}

.task-status {
  margin: auto;
}
.task-info {
  display: grid;
  grid-template-columns: 20vw 20vw 20vw 20vw;
  margin: auto;
}
.edit-button {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #de6262, #ffb88c);
  border: none;
  color: white;
  outline-color: coral;
}
.edit-button:hover {
  background-color: #ff7847;
}

.edit-button:active {
  background-color: #ff4400;
}
</style>