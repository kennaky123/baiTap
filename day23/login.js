const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginError = document.querySelector("#loginError");
const loginBtn = document.querySelector("#loginBtn");
const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

if (token && savedUser) {
    window.location.href = "./posts.html";
}
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    loginError.textContent = "";
    if (!username || !password) {
        loginError.textContent =
            "Vui lòng nhập đầy đủ username và password";
        return;
    }
    loginBtn.disabled = true;
    loginBtn.textContent = "Đang đăng nhập...";
    try {
        const res = await fetch(
            "https://dummyjson.com/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );
        if (!res.ok) {
            throw new Error("Sai tài khoản hoặc mật khẩu");
        }
        const data = await res.json();
        localStorage.setItem(
            "token",
            data.accessToken
        );
        localStorage.setItem(
            "refreshToken",
            data.refreshToken
        );
        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );
        window.location.href = "./posts.html";
    } catch (error) {
        if (!navigator.onLine) {
            loginError.textContent =
                "Không có kết nối Internet";
        } else {
            loginError.textContent = error.message;
        }
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Đăng nhập";
    }
});