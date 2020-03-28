<template>
  <div>
    <h3>Conversations</h3>
    <ul>
      <li v-for="message in messages">
        <p><span>{{message.content}}</span></p>
        <p><span>{{message.sender_name}}</span></p>
      </li>
    </ul>

    <form @submit.prevent="send_message">
      <label>email</label>
      <input type="text" v-model="message">

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '',
        messages: []
      }
    },
    created () {
      if(this.$store.state.signedIn){
        this.fetchData()
      } else {
        this.$router.push('/login')
      }
    },
    channels: {
      ConversationChannel: {
        received(data) {
          this.messages.push(data.object);
        },
      }
    },
    mounted() {
      this.$cable.subscribe({
        channel: 'ConversationChannel',
        id: 1
      });
    },
    methods: {
      fetchData() {
        this.$http.get('conversations/' + '1' + '/messages')
          .then(response => {
            this.messages = response.data.messages
          }, error => {
            console.log(error);
          })
      },
      send_message(){
        this.$http.post('conversations/' + '1' + '/messages', {
          content: this.message
        })
          .then(response => {
            console.log(response.data);
          }, error => {
            console.log(error);
          })
      }
    }
  }
</script>
