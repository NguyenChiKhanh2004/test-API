const express = require('express');
const app = express();
const userRoute = require('./src/routes/userroute');
const userRouteV1 = require('./src/routes/userRoteV1');
const sequelize = require('./src/models/userModel');

app.use(express.json());
app.use('/user', userRoute);

app.use(express.json());
app.use('/user/v1', userRouteV1);

// Khởi tạo database nếu chưa có
sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(3001, () => console.log('App listening at http://localhost:3001'));
});
