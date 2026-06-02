const express = require('express');
const router = express.Router();

const produtosController =
require('../controllers/produtosController');

router.get('/', produtosController.index);

router.post('/', produtosController.create);

router.put('/:id', produtosController.update);

router.delete('/:id', produtosController.delete);

module.exports = router;