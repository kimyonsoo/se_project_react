const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, { method: "DELETE" }).then(
    handleResponse
  );
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items/`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleResponse);
}

export { handleResponse, addItem, getItems, deleteCard };
