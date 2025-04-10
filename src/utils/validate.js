const { z } = require('zod');

// Hàm kiểm tra username
const validateUsername = (username) => {
    const usernameSchema = z.string().min(3, 'Tên đăng nhập phải từ 3 ký tự trở lên');
    const result = usernameSchema.safeParse(username);
    if (!result.success) {
        return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, data: username };
};

// Hàm kiểm tra password
const validatePassword = (password) => {
    const passwordSchema = z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên');
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
        return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, data: password };
};

// Hàm kiểm tra username và password
const validateUsernameAndPassword = (username, password) => {
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.success) {
        return usernameValidation;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.success) {
        return passwordValidation;
    }

    return { success: true, data: { username, password } };
};

module.exports = { validateUsernameAndPassword };
