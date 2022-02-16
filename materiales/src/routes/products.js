// ************ Require's ************
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require ('path')

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback (null, path.join(__dirname , '../../public/images/products'))
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
})
const upload = multer({ storage }).single ('image');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create', upload, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/', productsController.destroy); 


module.exports = router;
