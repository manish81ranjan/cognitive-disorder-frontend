const BACKEND = "https://cognitive-disorder-backend-7.onrender.com";

const analyzeBtn = document.getElementById("analyzeBtn");
const fileInput = document.getElementById("mriInput");
const viewer = document.getElementById("viewer");

analyzeBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // ⬅ stop form reload

  if (!fileInput || fileInput.files.length === 0) {
    alert("Please upload MRI image");
    return;
  }

  const formData = new FormData();
  formData.append("mri_image", fileInput.files[0]); // backend expects ONE image

  viewer.innerHTML = "⏳ Analyzing MRI scan...";

  try {
    const res = await fetch(`${BACKEND}/predict`, {
      method: "POST",
      body: formData,
      credentials: "include" // ⬅ REQUIRED for Render
    });

    if (!res.ok) {
      throw new Error("Prediction failed");
    }

    const data = await res.json();
    localStorage.setItem("mri_result", JSON.stringify(data));

    window.location.href = "result.html";

  } catch (err) {
    console.error(err);
    viewer.innerHTML = "❌ MRI analysis failed. Please try again.";
  }
});
