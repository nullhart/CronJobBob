<template>
  <div class="taskCard nes-container is-rounded is-dark">
    <span style="grid-area:a">
      <h3>{{data.name}}</h3>
    </span>
    <span style="grid-area:b" class="taskDescription">{{data.description}}</span>
    <span style="grid-area: l" class="taskLastRan">
      Last Ran:
      {{ new Date(data.lastRan).toUTCString()}}
    </span>
    <button style="grid-area:c;" class="nes-btn is-success">Run</button>
    <button
      type="button"
      class="nes-btn is-normal"
      @click="openDialog('dialog-' + index);dialog=!dialog"
    >Edit</button>
    <transition name="fade">
      <dialog v-show="dialog" class="nes-dialog fade" :id="'dialog-' + index">
        <form method="dialog">
          <p class="title">
            <span class="underline">Name</span>:
            <span>{{data.name}}</span>
          </p>
          <p>
            <span class="taskDescriptionDetails">{{data.description}}</span>
          </p>
          <transition name="fade">
            <textarea
              v-show="editTask"
              @focus="textareaGrow()"
              style="width: 100%;"
              @keypress="textareaGrow()"
              @change="() =>{data.command = format(data.command);}"
              v-model="data.command"
            />
          </transition>
          <Prism language="js" style="background-color: #272822">{{data.command}}</Prism>
          <menu class="dialog-menu">
            <button class="nes-btn" @click="dialog=!dialog">Cancel</button>
            <button @click="editing($event)" class="nes-btn is-warning">Edit</button>
            <button @click="dialog=!dialog" class="nes-btn is-primary">Confirm</button>
          </menu>
        </form>
      </dialog>
    </transition>
  </div>
</template>

<script>
import "../prism";
import "../prism.css";
import Prism from "vue-prism-component";
import dialogPolyfill from "dialog-polyfill";
export default {
  props: ["data", "index"],
  components: { Prism },
  data: function() {
    return {
      editTask: false,
      dialog: false
    };
  },
  methods: {
    isMobile: () => {
      return document.body.clientWidth > 800;
    },
    editing: function(event) {
      if (event) {
        event.preventDefault();
      }
      console.log("edit");
      this.editTask = !this.editTask;
    },
    textareaGrow: () => {
      var field = event.target;
      field.style.height = "inherit";
      var computed = window.getComputedStyle(field);

      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      field.style.height = height + "px";
      event.target.style.height = height;
    },
    format: function(code) {
      console.log("changed");
      var code = prettier.format(code, {
        parser: "babylon",
        plugins: prettierPlugins
      });

      return code;
    },
    openDialog: function(element) {
      document.getElementById(element).showModal();
    }
  },
  mounted() {
    //Pollyfill Dialog
    var dialog = document.querySelectorAll("dialog");
    dialog.forEach(node => {
      dialogPolyfill.registerDialog(node);
    });

    // document.getElementById("edit").addEventListener("click", function(event) {
    //   event.preventDefault();
    // });
  },
  created() {
    this.data.command = this.format(this.data.command);
  }
};
</script>

<style>
@import "../../node_modules/nes.css/css/nes.css";
@import url("../../node_modules/dialog-polyfill/dist/dialog-polyfill.css");

/*Animations*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

dialog::backdrop {
  /* native */
  background-color: rgb(0, 0, 0, 30%);
  backdrop-filter: blur(10px);
}
dialog + .backdrop {
  /* polyfill */
  background-color: rgb(0, 0, 0, 30%);
  backdrop-filter: blur(10px);
}
dialog {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  width: 80vw;
}
.underline {
  text-decoration: underline;
}

.taskCard {
  display: grid;
  justify-self: center;
  width: 350px;
  height: 300px;
  max-width: 350px;
  max-height: 300px;
  border-radius: 15px;
  grid-template-rows: 45px 3fr 1fr 55px;
  grid-template-areas:
    "a a"
    "b b"
    "l l"
    "c d ";
}

.taskDescriptionDetails {
  font-size: 0.8em;
  color: gray;
}

.taskLastRan {
  font-size: 0.7em;
}
</style>