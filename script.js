
const chatArea = document.getElementById("chatArea");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const modelSelector = document.getElementById("modelSelector");

const chatHistories = {
  vina: [],
  ryuu: [],
  blackbox: [],
  zero: []
};

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message " + (sender === "user" ? "user-message" : "bot-message");
  div.innerText = text;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot-message typing";
  typingDiv.innerText = "Typing...";
  typingDiv.id = "typingIndicator";
  chatArea.appendChild(typingDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

function renderChatHistory(model) {
  chatArea.innerHTML = "";
  chatHistories[model].forEach(msg => appendMessage(msg.sender, msg.text));
}

async function sendMessage() {
  const model = modelSelector.value;
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  chatHistories[model].push({ sender: "user", text });
  userInput.value = "";

  showTyping();

  let apiUrl = "";
  if (model === "vina") apiUrl = `https://vina.lol/api/gpt?text=${encodeURIComponent(text)}`;
  else if (model === "ryuu") apiUrl = `https://api.ryuxiao.tech/api/v1/ai?text=${encodeURIComponent(text)}`;
  else if (model === "blackbox") apiUrl = `https://www.abella.icu/blackbox-pro?q=${encodeURIComponent(text)}`;
  else if (model === "zero") apiUrl = `https://www.abella.icu/zero?q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    let reply = "Gagal menjawab.";
    if (model === "blackbox" && data.data?.answer?.result) reply = data.data.answer.result;
    else if (model === "zero" && data.data?.answer) reply = data.data.answer;
    else if (model === "vina" && data.result) reply = data.result;
    else if (model === "ryuu" && data.result) reply = data.result;

    removeTyping();
    appendMessage("bot", reply);
    chatHistories[model].push({ sender: "bot", text: reply });
  } catch (err) {
    removeTyping();
    appendMessage("bot", "Terjadi kesalahan saat menghubungi AI.");
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

modelSelector.addEventListener("change", () => {
  renderChatHistory(modelSelector.value);
});

renderChatHistory(modelSelector.value);
