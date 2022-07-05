const router = require('express').Router()
const appealCtrl = require('../controllers/appealCtrl')
const auth = require('../middleware/auth')

router.post('/appeal/add', auth, appealCtrl.add)
router.post('/appeal/accept', auth, appealCtrl.accept)
router.post('/appeal/deny', auth, appealCtrl.deny)
router.post('/appeal/gets', auth, appealCtrl.gets)

module.exports = router