const router = require('express').Router();
const taskRouter = require('./tasks');
const { apiErrorHandler } = require('../middlewares/error-handler');

router.use('/tasks', taskRouter);
router.use(apiErrorHandler);

module.exports = router;