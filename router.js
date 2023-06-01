const express = require('express');
const router = express.Router();
const conexion = require('./database/bd');

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/index', (req, res)=>{
    res.render('index')
})

router.get('/registro',(req, res)=>{
    res.render('registro');
});

router.get('/respaldo',(req, res)=>{
    res.render('respaldo');
});


const crud = require('./controllers/crud');


router.post('/validacion',crud.validacion);
router.post('/saveUser', crud.saveUser);




module.exports = router;