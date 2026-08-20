export async function BHBFetch(path, params) {
  const body_json = { 'api_key': '...', ...params }

  const response = await fetch('https://...' + path, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa("..."),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body_json)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
