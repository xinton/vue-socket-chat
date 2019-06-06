<template>
  <div class="messages-input">
    <form @submit.prevent="send">
      <input type="text" placeholder="Message..." @input="typing" v-model="message">
      <button type="primary" >Send</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    userTyping: Function
  },
  data: function() {
    return {
      message: ""
    };
  },
  methods: {
    send() {
      this.$emit("send-message", this.message);
      this.clearInput();
    },
    clearInput() {
      this.message = "";
    },
    typing() {
      this.userTyping();
    }
  }
};
</script>
<style>
.messages-input {
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
}

form {
  border-top: 1px solid #d7dae2;
  padding: 3px;
}

form input {
  border: 0;
  padding: 10px;
  width: 75%;
  margin-right: 2%;
}
</style>

