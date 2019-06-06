<template>
  <div class="join">
    <div class="join-card">
      <div class="join-header">
        <h2>Join Chat</h2>
      </div>
      <form ref="form">
        Nickname:
        <br>
        <input type="text" name="nickname" v-model="nickname">
        <br>
        <button>
          <router-link
            :to="{ name: 'chat', params: { nickname: this.nickname }}"
            >Join Chat
          </router-link>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "join",
  data: function() {
    return {
      nickname: ""
    };
  }
};
</script>

<style>
.join-card {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  width: 30%;
  height: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.join-header {
  border-bottom: 1px solid #d7dae2;
  padding: 20px;
  margin-bottom: 20px;
}
</style>