<template>
  <h1>Receipts</h1>
  <form>
    <div class="form-check">
      <select v-model="list_direction" @change="fetchReceipts">
	<option>inbound</option>
	<option>outbound</option>
      </select>
    </div>
  </form>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th>account</th>
	<th>amount</th>
	<th>filename</th>
	<th>id_by_customer</th>
	<th>type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in receipts">
	<td>{{ r.account }}</td>
	<td>{{ r.amount}}</td>
	<td>{{ r.filename }}</td>
	<td>{{ r.id_by_customer }}</td>
	<td>{{ r.type}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
import { BHBFetch } from './BHB.js'

</script>

<script>
export default {
  data() {
    return {
      receipts: [ ],
      list_direction: ref('outbound'),
    }
  },
  methods: {
    async fetchReceipts() {
      this.loading = true;
      this.error = null;

      try {
	const j = await BHBFetch('/receipts/get', { 'list_direction': this.list_direction });

	this.receipts = j.data;

      } catch (error) {
	this.error = error.message;
	console.error('Error fetching users:', error);
      } finally {
	this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchReceipts();
  }
}
</script>
