<template>
  <h1>PostingAccounts</h1>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th>name</th>
	<th>postingaccount_number</th>
	<th>type</th>
	<th>subtype</th>
	<th>parent_postingaccount_number</th>
	<th>parent_name</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="a in accounts">
      <td>{{ a.name }}</td>
      <td>{{ a.postingaccount_number }}</td>
      <td>{{ a.type }}</td>
      <td>{{ a.subtype }}</td>
      <td>{{ a.parent_postingaccount_number }}</td>
      <td>{{ a.parent_name }}</td>
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
	const j = await BHBFetch('/settings/get/postingaccounts');

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

