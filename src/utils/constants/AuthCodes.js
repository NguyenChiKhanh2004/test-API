const ErrorCodes = {
    // 400 - Bad Request
    MISSING_USERNAME: { code: 4001, message: "Vui lòng cung cấp tên đăng nhập." },
    MISSING_PASSWORD: { code: 4002, message: "Vui lòng cung cấp mật khẩu." },

    // 401 - Unauthorized
    LOGIN_FAILED: { code: 4011, message: "Đăng nhập thất bại." },
    LOGIN_FAILED_USERNAME: { code: 4012, message: "Không tìm thấy người dùng." },
    LOGIN_FAILED_PASSWORD: { code: 4013, message: "Sai Mật khẩu" },
    INVALID_USERNAME: { code: 4014, message: "Tên đăng nhập không hợp lệ." },
    INVALID_PASSWORD: { code: 4015, message: "Mật khẩu không hợp lệ." },

    UNAUTHORIZED_ACCESS: { code: 4014, message: "Bạn không có quyền truy cập tài nguyên này." },

    // 403 - Forbidden
    ACCOUNT_LOCKED: { code: 4030, message: "Tài khoản đã bị khóa." },

    // 404 - Not Found
    USER_NOT_FOUND: { code: 4040, message: "Không tìm thấy người dùng." },
    PRODUCT_NOT_FOUND: { code: 4041, message: "Không tìm thấy sản phẩm." },

    REGISTER_FAILED: { code: 4042, message: "Đăng ký thất bại." },

    REGISTER_FAILED_USERNAME: { code: 4043, message: "Tên đăng nhập đã tồn tại." },

    // 500 - Internal Server Error
    SERVER_ERROR: { code: 5000, message: "Đã xảy ra lỗi phía máy chủ." },
};

const SuccessCodes = {
    LOGIN_SUCCESS: { code: 2000, message: "Đăng nhập thành công." },
    USER_CREATED: { code: 2010, message: "Tạo người dùng thành công." },
    USER_UPDATED: { code: 2020, message: "Cập nhật người dùng thành công." },
    USER_DELETED: { code: 2030, message: "Xóa người dùng thành công." },
    REGISTER_SUCCESS: { code: 2040, message: "Đăng ký thành công." },
};

module.exports = {
    ErrorCodes,
    SuccessCodes,
};
