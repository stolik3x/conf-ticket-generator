document.getElementById("avatar").addEventListener("change", function(event) {
  const file = event.target.files[0]; // Получаем загруженный файл

  if (file) {
    // Проверяем размер файла
    const maxFileSize = 500 * 1024; // 500 KB в байтах
    if (file.size > maxFileSize) {
      alert("File size exceeds 500KB. Please upload a smaller image.");
      return; // Прерываем выполнение функции, если файл слишком большой
    }

    const reader = new FileReader();

    reader.onloadend = function() {
      const base64Image = reader.result; // Получаем строку в формате base64

      // Сохраняем base64 строку изображения в localStorage
      localStorage.setItem("userAvatar", base64Image);

      // Показываем контейнер с превью
      document.getElementById("previewContainer").style.display = "block";

      // Отображаем картинку в разделе загрузки
      document.getElementById("avatarPreview").src = base64Image;

      // Показываем сообщение, что изображение загружено
      document.getElementById("uploadStatus").textContent = "Image uploaded successfully!";
    };

    reader.readAsDataURL(file); // Читаем файл как base64 строку
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
  const avatar = localStorage.getItem("userAvatar"); // Получаем аватар из localStorage

  let formIsValid = true;

  // Проверка на имя
  if (name.trim() === "") {
    document.getElementById("nameErr").textContent = "Full name is required.";
    formIsValid = false;
  }

  // Проверка на email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("mailErr").textContent = "Please enter a valid email address.";
    formIsValid = false;
  }

  // Проверка на GitHub
  const githubPattern = /^[a-zA-Z0-9@]+$/;
  if (!github.match(githubPattern)) {
    document.getElementById("gitErr").textContent = "GitHub username should contain only letters and numbers.";
    formIsValid = false;
  }

  // Проверка на загрузку аватара
  if (!avatar) {
    alert("Please upload an avatar before submitting the form.");
    formIsValid = false;
  }

  // Если форма валидна
  if (formIsValid) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userGithub", github);
    window.location.href = "congrats.html";
  }
});
