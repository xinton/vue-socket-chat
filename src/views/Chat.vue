<template>
  <div class="chat">
    <div class="messages-box">
      <p class="typing">{{typingUsersText}}</p>
      <ul id="messages"></ul>
    </div>
    <Input @send-message="handleSendMessage" :userTyping="userTyping"/>
  </div>
</template>
<script>
import io from "socket.io-client";
import Input from '../components/chat/Input'

var socket = null;

export default {
  name: "chat",
  components: {
      Input,
  },
  props: {
    nickname: String
  },
  data: function() {
    return {
      message: "",
      typingUsersList: []
    };
  },
  methods: {
    handleSendMessage: function(message) {
      socket.emit("chat message", message);
    },
    userTyping: function() {
      socket.emit("typing");
    }
  },
  computed: {
    typingUsersText: function() {
      if (this.typingUsersList.length > 0) {
        return `${this.typingUsersList.join(", ")} is typing...`;
      } else {
        return "";
      }
    }
  },
  created: function() {
    socket = io.connect("http://localhost:3555");
    socket.user = this.nickname;
    socket.emit("set nickname", this.nickname);
  },
  mounted: function() {
    socket.on("chat message", function(message) {
      var node = document.createElement("li");
      var textnode = document.createTextNode(message);
      node.appendChild(textnode);
      document.getElementById("messages").appendChild(node);
    });

    socket.on("typing users", list => {
      this.typingUsersList = list;
    });
  }
};
</script>

<style>
body {
  font: 13px Helvetica, Arial;
}

.chat {
  height: 100%;
  position: static;
}

.typing {
  display: block;
  top: 0;
  width: 100%;
  text-align: right;
  font-style: italic;
}

.messages-box {
  display: block;
}

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

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}
</style>