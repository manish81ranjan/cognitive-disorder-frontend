window.onerror = () => true;

// 🔗 Render Backend URL (CHANGE IF NEEDED)
const BACKEND = "https://cognitive-disorder-backend-6.onrender.com";

const analyzeBtn = document.getElementById("analyzeBtn");
const fileInput = document.getElementById("mriInput");
const viewer = document.getElementById("viewer");

analyzeBtn.addEventListener("click", async () => {
  if (!fileInput.files.length) {
    alert("Please upload MRI image(s)");
    return;
  }

  const formData = new FormData();

  // Append MRI files
  for (let file of fileInput.files) {
    formData.append("files", file);
  }

  viewer.innerHTML = "⏳ Analyzing MRI scan...";

  try {
    const res = await fetch(`${BACKEND}/predict`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    // Save result for result.html
    localStorage.setItem("mri_result", JSON.stringify({
      prediction: data.label,
      confidence: data.confidence,
      gradcam_url: data.gradcam_url,
      report_id: data.report_id
    }));

    // Redirect to result page
    window.location.href = "result.html";

  } catch (err) {
    console.error(err);
    viewer.innerHTML = "❌ MRI analysis failed. Try again.";
  }
});
