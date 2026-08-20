<template>
  <form>
    <div class="form-group">
      <label for="date_from">date_from</label>
      <input type="date" value="2026-08-01" id="date_from" v-model="date_from" @change="fetchPostings"/>
    </div>
    <div class="form-group">
      <label for="date_to">date_to</label>
      <input type="date" value="2026-08-31" id="date_to" v-model="date_to" @change="fetchPostings"/>
    </div>
  </form>
  <h1>Postings</h1>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th scope="col">id_by_customer</th>
	<th scope="col">date</th>
	<th scope="col">cost_location</th>
	<th scope="col">credit_type</th>
	<th scope="col">amount</th>
	<th scope="col">currency</th>
	<th scope="col">postingtext</th>
	<th scope="col">debit_postingaccount_number</th>
	<th scope="col">credit_postingaccount_number</th>
	<th scope="col">transaction_purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in postings">
	<td>{{ p.id_by_customer }}</td>
	<td>{{ p.date }}</td>
	<td>{{ p.cost_location }}</td>
	<td>{{ p.credit_type }}</td>
	<td>{{ p.amount }}</td>
	<td>{{ p.currency }}</td>
	<td>{{ p.postingtext }}</td>
	<td>{{ p.debit_postingaccount_number }}</td>
	<td>{{ p.credit_postingaccount_number }}</td>
	<td>{{ p.transaction_purpose }}</td>
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
      postings: [ ],
      date_from: ref('2026-08-01'),
      date_to: ref('2026-08-31'),
    }
  },
  methods: {
    async fetchPostings() {
      this.loading = true;
      this.error = null;

      try {
	const j = await BHBFetch('/postings/get', { 'date_from': this.date_from, 'date_to': this.date_to });

	console.log(j.data)
	this.postings = j.data;

      } catch (error) {
	this.error = error.message;
	console.error('Error fetching users:', error);
      } finally {
	this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchPostings();
  }
}
</script>
