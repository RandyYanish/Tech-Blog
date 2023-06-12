const router = require('express').Router();
const userRoutes = require('./userRouters');

router.use('/users', userRoutes);

module.exports = router;