<!--
SPDX-FileCopyrightText: 2026 Uwe Kleine-König <uwe@kleine-koenig.org>

SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
  <form @submit.prevent="setCreds">
    <div class="form-group">
      <label for="usernameinput">Username</label>
      <input type="text" class="form-control" id="usernameinput" v-model="authstate.username" placeholder="Username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="authstate.password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="apikey">APIKey</label>
      <input type="password" class="form-control" id="apikey" v-model="authstate.apikey" placeholder="APIKey">
    </div>
    <button type="submit" class="btn btn-primary">OK</button>
  </form>
</template>

<script setup>
import { authstore } from './BHB.js'
import { useStorage } from '@vueuse/core'
</script>

<script>
export default {
  data() {
    return {
      authstate: useStorage('BHB', { username: '', password: '', apikey: '' }),
    }
  },
  methods: {
    setCreds: function() {
      authstore.setauth(this.authstate.username, this.authstate.password, this.authstate.apikey)
    },
  }
}
</script>
