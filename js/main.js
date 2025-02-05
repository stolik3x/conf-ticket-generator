document.getElementById("avatar").addEventListener("change", function(event) {
  const file = event.target.files[0];

  if (file) {
    const maxFileSize = 500 * 1024;
    if (file.size > maxFileSize) {
      alert("Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = function() {
      const base64Image = reader.result;
      localStorage.setItem("userAvatar", base64Image);
      document.getElementById("previewContainer").style.display = "block";
      document.getElementById("avatarPreview").src = base64Image;
      document.getElementById("uploadStatus").textContent = "Image uploaded successfully!";
    };

    reader.readAsDataURL(file);
  }
});

document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("nameErr").textContent = "";
  document.getElementById("mailErr").textContent = "";
  document.getElementById("gitErr").textContent = "";

  const name = document.getElementById("nameArea").value;
  const email = document.getElementById("mailArea").value;
  const github = document.getElementById("gitArea").value;
  const avatar = localStorage.getItem("userAvatar");

  let formIsValid = true;

  if (name.trim() === "") {
    document.getElementById("nameErr").textContent = "Full name is required.";
    formIsValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("mailErr").textContent = "Please enter a valid email address.";
    formIsValid = false;
  }

  const githubPattern = /^[a-zA-Z0-9@]+$/;
  if (!github.match(githubPattern)) {
    document.getElementById("gitErr").textContent = "GitHub username should contain only letters and numbers.";
    formIsValid = false;
  }

  if (!avatar) {
    alert("Please upload an avatar before submitting the form.");
    formIsValid = false;
  }

  if (formIsValid) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userGithub", github);
    window.location.href = "congrats.html";
  }
});
