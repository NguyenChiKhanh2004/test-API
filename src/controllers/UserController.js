const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const ResponseDTO = require('../utils/response/ResponseDTO');
const { ErrorCodes, SuccessCodes } = require('../utils/constants/AuthCodes');
const { validateUsernameAndPassword } = require('../utils/validate');
const auth = require('../utils/auth');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!checkIfNull(username, password, res)) {
        return;
    }
    const validationResult = validateUsernameAndPassword(username, password);
    if (!validationResult.success) {
        return res.status(400).json(
            ResponseDTO.error(
                validationResult.error,
                code = 4014
            )
        );
    }
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json(
                ResponseDTO.error(
                    ErrorCodes.LOGIN_FAILED_USERNAME.message,
                    ErrorCodes.LOGIN_FAILED_USERNAME.code
                ));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(
                ResponseDTO.error(
                    ErrorCodes.LOGIN_FAILED_PASSWORD.message,
                    ErrorCodes.LOGIN_FAILED_PASSWORD.code));
        }
        const currentUser = {
            id: user.id,
            username: user.username
        };
        const accessToken = auth.generateAccessToKen(currentUser);
        return res.status(200).json(
            ResponseDTO.success(
                null,
                SuccessCodes.LOGIN_SUCCESS.message,
                SuccessCodes.LOGIN_SUCCESS.code),
            res.cookie('accessToken', accessToken, {
                httpOnly: true
            }));
    } catch (error) {
        return res.status(500).json(ResponseDTO.error(error.message));
    }
};

const createUsers = async (req, res) => {

    const { username, password } = req.body;

    if (!checkIfNull(username, password, res)) {
        return;
    }
    const validationResult = validateUsernameAndPassword(username, password);
    if (!validationResult.success) {
        return res.status(400).json(
            ResponseDTO.error(
                validationResult.error,
                code = 4014
            )
        );
    }
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json(
                ResponseDTO.error(
                    ErrorCodes.REGISTER_FAILED_USERNAME.message,
                    ErrorCodes.REGISTER_FAILED_USERNAME.code));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });

        return res.status(201).json(
            ResponseDTO.success(
                null,
                SuccessCodes.REGISTER_SUCCESS.message,
                SuccessCodes.REGISTER_SUCCESS.code));
    } catch (error) {
        return res.status(500).json(
            ResponseDTO.error(
                ErrorCodes.SERVER_ERROR.message,
                ErrorCodes.SERVER_ERROR.code));
    }
};

// Hàm dùng chung để kiểm tra username và password
const checkIfNull = (username, password, res) => {
    if (!username) {
        res.status(400).json(
            ResponseDTO.error(
                ErrorCodes.MISSING_USERNAME.message,
                ErrorCodes.MISSING_USERNAME.code
            )
        );
        return false;
    }

    if (!password) {
        res.status(400).json(
            ResponseDTO.error(
                ErrorCodes.MISSING_PASSWORD.message,
                ErrorCodes.MISSING_PASSWORD.code
            )
        );
        return false;
    }

    return true;
};

module.exports = {
    login,
    createUsers
};
