import express from 'express'
import registerRoute from '../routes/register.js'

const router = express.Router();

router.use(registerRoute);

export default router;