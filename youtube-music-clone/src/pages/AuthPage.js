export function AuthPage(register = false) {
  const mode = register ? "register" : "login";
  const fields = register
    ? [
        ["name", "Tên hiển thị", "text", "name"],
        ["email", "Email", "email", "email"],
        ["password", "Mật khẩu", "password", "new-password"],
        ["confirm-password", "Nhập lại mật khẩu", "password", "new-password"],
      ]
    : [
        ["email", "Email", "email", "email"],
        ["password", "Mật khẩu", "password", "current-password"],
      ];
  return `<section class="auth-shell"><img src="/logo.svg" width="42" height="42" alt=""><h1>${register ? "Tạo tài khoản" : "Đăng nhập"}</h1><form id="${mode}-form">${fields.map(([name, label, type, autocomplete]) => `<label for="${mode}-${name}">${label}</label><input id="${mode}-${name}" name="${name}" type="${type}" autocomplete="${autocomplete}" required ${type === "password" && register ? 'minlength="6"' : ""}>`).join("")}<p id="${mode}-error" class="form-error" role="alert"></p><button class="pill light" type="submit">${register ? "Đăng ký" : "Đăng nhập"}</button></form><p class="auth-footer">${register ? 'Bạn đã có tài khoản? <a href="/login" data-navigo>Đăng nhập</a>' : 'Bạn chưa có tài khoản? <a href="/register" data-navigo>Đăng ký</a>'}</p></section>`;
}
