const router = require('express').Router();
const general = require('../controllers/generalController.js');
const { isLoggedIn } = require('../middleware.js');
const catchAsync = require('../utils/CatchAsync.js');

router.route('/generateQRCode')
    .post(catchAsync(general.generateQRCode));


router.route('/getQRCode')
    .get(catchAsync(general.getQRCode));

router.route('/validateUser')
    .post(catchAsync(general.validateUser));


module.exports = router;