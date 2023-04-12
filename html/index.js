const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
let messages = [];

let email, name, message;

emailInput.addEventListener("change", (e) => {
  email = e.target.value;
});

nameInput.addEventListener("change", (e) => {
  name = e.target.value;
});

messageInput.addEventListener("change", (e) => {
  message = e.target.value;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const messageObject = { name, email, message };

    const data = await fetch("http://localhost:3000/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(messageObject),
    });
    const res = await data.json();
    console.log({ res });
    localStorage.setItem("token", res.token);
    alert(res.message);
  } catch (error) {
    console.log({ error });
  }
});

const getAllMessages = async () => {
  const data = await fetch("http://localhost:3000/posts");
  const res = await data.json();
  messages = res.data;
  console.log({ messages });
};

getAllMessages();
