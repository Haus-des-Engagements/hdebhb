import { reactive } from 'vue'

export const authstore = reactive({
  username: 'username init',
  password: 'password init',
  apikey: 'apikey init',
  valid: false,

  setauth: function(u, p, a) {
    this.username = u
    this.password = p
    this.apikey = a

    this.valid = true
  },
})

export async function BHBFetch(path, params) {

  const body_json = { 'api_key': authstore.apikey, ...params }

  const response = await fetch('/api/v1' + path, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(authstore.username + ':' + authstore.password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body_json)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
