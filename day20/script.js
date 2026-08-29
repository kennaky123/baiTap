
const form = document.getElementById("registerForm");
const resultBox = document.getElementById("result");



function showError(fieldName, message) {
  const field = document.getElementById("field-" + fieldName);
  const errorMsg = field.querySelector(".error-msg");

  field.classList.add("error");
  field.classList.remove("success");

  errorMsg.textContent = message;
}

function showSuccess(fieldName) {
  const field = document.getElementById("field-" + fieldName);
  const errorMsg = field.querySelector(".error-msg");

  field.classList.remove("error");
  field.classList.add("success");

  errorMsg.textContent = "";
}


function validateFullname() {
  const value = document.getElementById("fullname").value.trim();

  if (value === "") {
    showError("fullname", "Họ và tên không được để trống");
    return false;
  }

  if (value.length < 2) {
    showError("fullname", "Họ và tên phải có ít nhất 2 ký tự");
    return false;
  }

  showSuccess("fullname");
  return true;
}

function validateUsername() {
  const value = document.getElementById("username").value.trim();

  if (value === "") {
    showError("username", "Tên đăng nhập không được để trống");
    return false;
  }


  const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;

  if (!usernameRegex.test(value)) {
    showError(
      "username",
      "Tên đăng nhập phải từ 4-16 ký tự, chỉ gồm chữ, số và dấu _",
    );
    return false;
  }

  showSuccess("username");
  return true;
}


function validateEmail() {
  const value = document.getElementById("email").value.trim();

  if (value === "") {
    showError("email", "Email không được để trống");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    showError("email", "Email không đúng định dạng");
    return false;
  }

  showSuccess("email");
  return true;
}

function validatePhone() {
  const value = document.getElementById("phone").value.trim();

  if (value === "") {
    showError("phone", "Số điện thoại không được để trống");
    return false;
  }

  
  const phoneRegex = /^0\d{9}$/;

  if (!phoneRegex.test(value)) {
    showError(
      "phone",
      "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0",
    );
    return false;
  }

  showSuccess("phone");
  return true;
}


function validatePassword() {
  const value = document.getElementById("password").value;

  if (value === "") {
    showError("password", "Mật khẩu không được để trống");
    return false;
  }

  if (value.length < 8) {
    showError("password", "Mật khẩu phải có ít nhất 8 ký tự");
    return false;
  }


  if (!/[A-Z]/.test(value)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa");
    return false;
  }

  
  if (!/[0-9]/.test(value)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ số");
    return false;
  }

  showSuccess("password");
  return true;
}
function validateConfirm() {
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (confirm === "") {
    showError("confirm", "Vui lòng xác nhận mật khẩu");
    return false;
  }

  if (confirm !== password) {
    showError("confirm", "Mật khẩu xác nhận không khớp");
    return false;
  }

  showSuccess("confirm");
  return true;
}

document
  .getElementById("fullname")
  .addEventListener("blur", validateFullname);

document
  .getElementById("username")
  .addEventListener("blur", validateUsername);

document.getElementById("email").addEventListener("blur", validateEmail);

document.getElementById("phone").addEventListener("blur", validatePhone);

document
  .getElementById("password")
  .addEventListener("blur", validatePassword);

document
  .getElementById("confirm")
  .addEventListener("blur", validateConfirm);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const checks = [
    validateFullname(),
    validateUsername(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
    validateConfirm(),
  ];

  const isValid = checks.every(Boolean);

  if (isValid) {
    resultBox.className = "show ok";
    resultBox.textContent = "Đăng ký thành công!";
  } else {
    resultBox.className = "show fail";
    resultBox.textContent = "Vui lòng kiểm tra lại thông tin!";
  }
});