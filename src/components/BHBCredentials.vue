<template>
  <form @submit.prevent="setCreds">
    <div class="form-group">
      <label for="usernameinput">Username</label>
      <input type="text" class="form-control" id="usernameinput" v-model="username" placeholder="Username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="apikey">APIKey</label>
      <input type="password" class="form-control" id="apikey" v-model="apikey" placeholder="APIKey">
    </div>
    <button type="submit" class="btn btn-primary">OK</button>
  </form>
</template>

<script setup>
import { authstore } from './BHB.js'
</script>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      apikey: '',
    }
  },
  methods: {
    setCreds: function() {
      authstore.setauth(this.username, this.password, this.apikey)
    },
  }
}
</script>
