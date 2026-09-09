<template>
  <h1>Accounts</h1>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th>name</th>
	<th>postingaccount_number</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="a in accounts">
      <td>{{ a.name }}</td>
      <td>{{ a.postingaccount_number }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { BHBFetch } from './BHB.js'
</script>
<script>
export default {
  data() {
    return {
      accounts: [ ]
    }
  },
  methods: {
    async fetchAccounts() {
      this.loading = true;
      this.error = null;

      try {
	const j = await BHBFetch('/accounts/get');

	this.accounts = j.data;

      } catch (error) {
	this.error = error.message;
	console.error('Error fetching users:', error);
      } finally {
	this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchAccounts();
  }
}
</script>
