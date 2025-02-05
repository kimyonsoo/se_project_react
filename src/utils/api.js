const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, { method: "DELETE" }).then(
    (res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }
  );
}

export { getItems, deleteCard };
