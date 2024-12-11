const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./Models/db')
const cors = require('cors')
const EmployeeRoutes = require('./Routes/EmployeeRoutes')
const { createAdminAccount } = require("./scripts/setup")
const signupRoute = require("./Routes/SignUp")
const loginRoute = require("./Routes/Login")
const authenticatedRoute = require("./Routes/Authenticated")

app.use(cors())

createAdminAccount();

app.use(express.json());

app.use(bodyParser.json());

app.use('/api/employees', EmployeeRoutes)

app.use("/user", signupRoute);
app.use("/user/login", loginRoute);
app.use("/api", authenticatedRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
