const container = document.querySelector(".container");
const usersContainer = document.querySelector(".users-list");
const infoContainer = document.querySelector(".users-info");

function getUsers(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
  xhr.addEventListener("error", () => {
    console.log("Error");
  });

  xhr.send();
}

function usersEventHandler(response) {
  usersContainer.addEventListener("click", (e) => {
    if (e.target.nodeName == "LI") {
      infoContainer.textContent = "";
      const li = e.target;
      const id = li.dataset["id"];
      renderInformationUser(response, id);
    }
  });
}

function renderInformationUser(response, id) {
  response.forEach((user) => {
    if (user.id == id) {
      createUserInfo(user);
    }
  });
}
function createUserInfo(user) {
  const listForUserInfo = document.createElement("ul");
  listForUserInfo.classList.add("user-info", "list-group");
  const name = document.createElement("li");
  name.classList.add("list-group-item");
  name.textContent = `Name: ${user.name}`;
  const email = document.createElement("li");
  email.classList.add("list-group-item");
  email.textContent = `Email: ${user.email}`;
  const city = document.createElement("li");
  city.classList.add("list-group-item");
  city.textContent = `City: ${user.address.city}`;

  listForUserInfo.appendChild(name);
  listForUserInfo.appendChild(email);
  listForUserInfo.appendChild(city);
  infoContainer.appendChild(listForUserInfo);
}

function renderAndCreateUsers(response) {
  const list = document.createElement("ul");
  list.classList.add("list-of-users", "list-group");
  response.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = user.id;
    listItem.classList.add("list-group-item");
    listItem.textContent = user.name;
    list.appendChild(listItem);
  });
  usersContainer.appendChild(list);
}

getUsers((response) => {
  renderAndCreateUsers(response);
  usersEventHandler(response);
});
