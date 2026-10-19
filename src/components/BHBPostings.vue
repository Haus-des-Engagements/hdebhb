<!--
SPDX-FileCopyrightText: 2026 Uwe Kleine-König <uwe@kleine-koenig.org>

SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
  <form>
    <div class="form-group">
      <label for="date_from">date_from</label>
      <input type="date" value="2026-09-01" id="date_from" v-model="date_from" @change="fetchPostings"/>
    </div>
    <div class="form-group">
      <label for="date_to">date_to</label>
      <input type="date" value="2026-09-30" id="date_to" v-model="date_to" @change="fetchPostings"/>
    </div>
    <div class="form-group">
      <label for="cost-location-filter">cost-location</label>
      <select id="cost-location-filter" v-model="cost_location_filter" @change="update">
        <option value="">all</option>
	<template v-for="cl in cost_locations">
	<option :value="cl">{{ cl }}</option>
	</template>
      </select>
    </div>
  </form>
  <h1>Postings</h1>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th scope="col">id</th>
	<th scope="col">date</th>
	<th scope="col">cost_location</th>
	<th scope="col">credit_type</th>
	<th scope="col">amount</th>
	<th scope="col">currency</th>
	<th scope="col">postingtext</th>
	<th scope="col">debit_postingaccount_number</th>
	<th scope="col">debit_postingaccount_name</th>
	<th scope="col">credit_postingaccount_number</th>
	<th scope="col">credit_postingaccount_name</th>
	<th scope="col">transaction_id</th>
	<th scope="col">transaction_purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in filtered_postings">
	<td>{{ p.id_by_customer }}</td>
	<td>{{ p.date }}</td>
	<td>{{ p.cost_location }}</td>
	<td>{{ p.credit_type }}</td>
	<td>{{ p.amount }}</td>
	<td>{{ p.currency }}</td>
	<td>{{ p.postingtext }}</td>
	<td>{{ p.debit_postingaccount_number }}</td>
	<td>{{ p.debit_postingaccount_name }}</td>
	<td>{{ p.credit_postingaccount_number }}</td>
	<td>{{ p.credit_postingaccount_name }}</td>
	<td>{{ p.transaction_id_by_customer }}</td>
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
      cost_locations: [],
      cost_location_filter: '',
      filtered_postings: [ ],
      postings: [ ],
      date_from: ref('2026-08-01'),
      date_to: ref('2026-08-31'),
    }
  },
  methods: {
    update() {
      var cost_locations = [];

      this.filtered_postings = [];
      this.postings.forEach((element) => {
	if (element.cost_location && !cost_locations.includes(element.cost_location)) {
	  cost_locations.push(element.cost_location);
	}

	if (this.cost_location_filter === '' || this.cost_location_filter == element.cost_location) {
	  this.filtered_postings.push(element);
	}
      });
      cost_locations.sort();
      this.cost_locations = cost_locations;
    },
    async fetchPostings() {
      this.loading = true;
      this.error = null;

      try {
	const pp = BHBFetch('/postings/get', { 'date_from': this.date_from, 'date_to': this.date_to });
	const ppa = BHBFetch('/settings/get/postingaccounts');
	const pa = BHBFetch('/accounts/get');

	const all = await Promise.all([pp, ppa, pa])

	const postings = all[0]
	const globalaccounts = all[1]
	const accounts = all[2]

	const accountmap = new Map()
	accounts.data.forEach((a) => {
		accountmap.set(a.postingaccount_number, a.name)
	})
	globalaccounts.data.forEach((a) => {
		accountmap.set(a.postingaccount_number, a.name)
	})

	this.postings = postings.data

	postings.data.forEach((p) => {
		if (accountmap.has(p.debit_postingaccount_number)) {
			p.debit_postingaccount_name = accountmap.get(p.debit_postingaccount_number);
		}
		if (accountmap.has(p.credit_postingaccount_number)) {
			p.credit_postingaccount_name = accountmap.get(p.credit_postingaccount_number);
		}
	})

      } catch (error) {
	this.error = error.message;
	console.error('Error fetching users:', error);
      } finally {
	this.loading = false;
      }
      this.update();
    }
  },
  mounted() {
    this.fetchPostings();
  }
}
</script>
