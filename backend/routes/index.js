import express from "express";
import registerRoute from "../routes/register.js";
import loginRoute from "../routes/login.js";
import userRoutes from "../routes/user.js";
import caseRoutes from '../routes/case.js';
import acceptCaseRoute from '../routes/newcase.js';

const router = express.Router();

router.use(registerRoute);
router.use(loginRoute);
router.use(userRoutes);
router.use(caseRoutes);
router.use(acceptCaseRoute);

export default router;