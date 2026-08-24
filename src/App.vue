<script>
import { ref } from 'vue'
import { authstore } from './components/BHB.js'

import BHBAccounts from './components/BHBAccounts.vue'
import BHBReceipts from './components/BHBReceipts.vue'
import BHBTransactions from './components/BHBTransactions.vue'
import BHBPostings from './components/BHBPostings.vue'
import BHBCredentials from './components/BHBCredentials.vue'

const routes = {
 '/': BHBTransactions,
 '/accounts': BHBAccounts,
 '/receipts': BHBReceipts,
 '/transactions': BHBTransactions,
 '/postings': BHBPostings,
}

export default {
  data() {
    return {
      currentPath: window.location.hash,
    }
  },
  computed: {
    currentView() {
      if (authstore.valid) {
	return routes[this.currentPath.slice(1) || '/'] || BHBAccounts
      } else {
	return BHBCredentials
      }
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>

  <component :is="currentView" />

</template>
