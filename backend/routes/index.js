import express from 'express'
import registerRoute from '../routes/register.js'
import loginRoute from '../routes/login.js'

const router = express.Router();

router.use(registerRoute);
router.use(loginRoute);

export default router;