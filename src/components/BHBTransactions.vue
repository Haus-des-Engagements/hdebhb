<!--
SPDX-FileCopyrightText: 2026 Uwe Kleine-König <uwe@kleine-koenig.org>

SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
  <h1>Transactions</h1>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
	<th>amount</th>
	<th>id_by_customer</th>
	<th>to_from</th>
	<th>booking_date</th>
	<th>value_date</th>
	<th>purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="t in transactions">
	<td>{{ t.amount}}</td>
	<td>{{ t.id_by_customer }}</td>
	<td>{{ t.to_from }}</td>
	<td>{{ t.booking_date }}</td>
	<td>{{ t.value_date }}</td>
	<td>{{ t.purpose }}</td>
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
      transactions: [ ]
    }
  },
  methods: {
    async fetchTransactions() {
      this.loading = true;
      this.error = null;

      try {
	const j = await BHBFetch('/transactions/get');

	this.transactions = j.data;
      } catch (error) {
	this.error = error.message;
	console.error('Error fetching users:', error);
      } finally {
	this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchTransactions();
  }
}
</script>
