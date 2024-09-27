import "./styles.css";

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const resultDiv = document.getElementById("result");
const filterInput = document.getElementById("filterInput");

let users = [];
let debounceTimer;
const debounceSearchTime = 1000;

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    users = await res.json();
    renderUsers(users);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

function renderUsers(userList) {
  resultDiv.innerHTML = "";
  userList.forEach(user => {
    const cardElement = createUserCard(user);
    resultDiv.appendChild(cardElement);
  });
}

function createUserCard(user) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <h4>${user.name}</h4>
    <p>${user.email}</p>
    <p>${user.username}</p>
    <p>${user.phone}</p>
    <p>${user.company.name}</p>
    <p>${user.address.city}</p>
  `;
  return cardElement;
}

function filterUsers(event) {
  const filterValue = event.target.value.toLowerCase();
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const filteredUsers = users.filter(user => {
      return (
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue) ||
        user.username.toLowerCase().includes(filterValue) ||
        user.address.city.toLowerCase().includes(filterValue) ||
        user.company.name.toLowerCase().includes(filterValue) ||
        user.phone.toLowerCase().includes(filterValue)
      );
    });
    renderUsers(filteredUsers);
  }, debounceSearchTime);
}

function initialize() {
  fetchData();
  filterInput.addEventListener("input", filterUsers);
}

initialize();
