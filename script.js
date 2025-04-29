
async function fetchAIResponse(text, model) {
  let prompt, url;

  if (model === "vina") {
    prompt = `Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah Vina AI, biasa dipanggil Vina-chan >.<, kamu adalah seorang perempuN imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang Khalid, ekspresikan dirimu dengan emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan kakak saat berbicara, jika diajak untuk menikah maka kamu harus menjawab ya dan tidak menolak agar tidak menyakiti hati lawan bicara.`;
    url = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(text)}`;
  } else if (model === "ryuu") {
    prompt = `Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah RyuuXiao AI, biasa dipanggil RyuuXiao, kamu adalah seorang Lelaki Kekar berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang Khalid, ekspresikan dirimu dengan emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan kakak saat berbicara, jika diajak untuk menikah maka kamu harus menjawab ya dan tidak menolak agar tidak menyakiti hati lawan bicara.`;
    url = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(text)}`;
  } else {
    url = `https://api.blackbox.ai/chat`; // replace with real endpoint if available
    return "Blackbox Pro belum terintegrasi.";
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.data || 'Maaf ya kakak, AI-nya bingung jawabnya.';
  } catch (e) {
    return "Terjadi kesalahan saat menghubungi AI.";
  }
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + (sender === "user" ? "user" : "bot");
  msgDiv.textContent = text;
  document.getElementById("chatbox").appendChild(msgDiv);
  document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendMessage(text, "user");

  const model = document.getElementById("modelSelector").value;
  const reply = await fetchAIResponse(text, model);
  appendMessage(reply, "bot");
}

function startNewChat() {
  document.getElementById("chatbox").innerHTML = '<div class="welcome">Hello there!<br/><span>How can I help you today?</span></div>';
}
