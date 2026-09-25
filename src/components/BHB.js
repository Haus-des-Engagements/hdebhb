// SPDX-FileCopyrightText: 2026 Uwe Kleine-König <uwe@kleine-koenig.org>
//
// SPDX-License-Identifier: AGPL-3.0-only

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

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

function ratelimit(ms) {
	var throttle = async function(prms, ...args) {
		var p = new Promise(async (resolve, reject) => {
			throttle.queue.push({ resolve: resolve, reject: reject, prms: prms, args: args });
			await throttle.run();
		})
		return p;
	};

	throttle.lastexecend = Date.now();
	throttle.queue = [];
	throttle.current = null;

	throttle.run = async function() {
		if (throttle.current == null && throttle.queue.length > 0) {

			throttle.current = delay(ms - (Date.now() - throttle.lastexecend)).then(async () => {
				if (Date.now() - throttle.lastexecend >= ms) {
					var o = throttle.queue.shift();
					try {
						var prms;
						if (typeof(o.prms) == 'function')
							prms = o.prms.apply(null, o.args);
						else
							prms = o.prms;

						o.resolve(await prms);
					} catch (error) {
						o.reject(error);
					}
					throttle.lastexecend = Date.now();
				}

				throttle.current = null;
				throttle.run();
			});
		}
	}

	return throttle;
};

var throttle = ratelimit(1000);

export async function BHBFetch(path, params) {

  const body_json = { 'api_key': authstore.apikey, ...params }

  const response = await throttle(fetch, '/api/v1' + path, {
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
