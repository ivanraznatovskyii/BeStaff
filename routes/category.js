const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/category');
const upload = require('../middleware/upload');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll); //стратегия паспорта (passport-__JWT__ например) (не имя переменной)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.update);


module.exports = router;