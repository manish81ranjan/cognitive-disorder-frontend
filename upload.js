const BACKEND = "https://cognitive-disorder-backend-6.onrender.com";

const analyzeBtn = document.getElementById("analyzeBtn");
const fileInput = document.getElementById("mriInput");
const viewer = document.getElementById("viewer");

analyzeBtn.addEventListener("click", async () => {
  if (!fileInput || !fileInput.files.length) {
    alert("Please upload MRI image(s)");
    return;
  }

  const formData = new FormData();

  for (let file of fileInput.files) {
    formData.append("mri_image", file);
  }

  viewer.innerHTML = "⏳ Analyzing MRI scan...";

  try {
    const res = await fetch(`${BACKEND}/predict`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    localStorage.setItem("mri_result", JSON.stringify(data));

    window.location.href = "result.html";

  } catch (err) {
    console.error(err);
    viewer.innerHTML = "❌ MRI analysis failed. Try again.";
  }
});
