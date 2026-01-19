const API = "https://cognitive-disorder-backend-7.onrender.com";

/* ================= LOGIN ================= */
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      body: formData,
      credentials: "include"   // 🔑 REQUIRED
    });

    const data = await res.json();

    if (data.status === "success") {
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login failed");
    }

  } catch (err) {
    alert("Server not reachable");
    console.error(err);
  }
});

/* ================= SIGNUP ================= */
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      body: formData,
      credentials: "include"   // 🔑 REQUIRED
