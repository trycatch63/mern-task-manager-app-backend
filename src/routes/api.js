const express = require('express');
const UsersController = require("../controllers/UserController");
const AuthVerify = require("../middleware/AuthVerifyMiddleware");
const TaskController = require("../controllers/TaskController");

// Use before defining your routes for cors policy
const cors = require('cors');
const app = express();
app.use(cors()); 

// Router
const router = express.Router();

//API Routing End Point

// User Info
router.post("/registration", UsersController.registration)
router.post("/login", UsersController.login)
router.post("/profile-update", AuthVerify,UsersController.profileUpdate)
router.get("/profile-details", AuthVerify,UsersController.profileDetails)

router.get("/recover-verify-email/:email", UsersController.recoverVerifyEmail)
router.get("/recover-verify-otp/:email/:otp", UsersController.recoverVerifyOTP)
router.post("/recover-reset-password", UsersController.recoverResetPassword)

// Task Info
router.post("/add-task", AuthVerify,TaskController.createTask)
router.get("/delete-task/:id", AuthVerify,TaskController.deleteTask)
router.get("/update-task/:id/:status", AuthVerify,TaskController.updateTask)
router.get("/list-task-by-status/:status", AuthVerify,TaskController.listTaskByStatus)
router.get("/task-status-count", AuthVerify,TaskController.taskStatusByCount)

module.exports = router;