const express = require('express');
const router = express.Router();
const conexion = require('./database/bd');

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/index', (req, res)=>{
    
    conexion.query('SELECT * FROM asiento',(error , results) =>{
        if(error){
            throw error;
        }else{
            res.render('index' ,{results:results})
        }
    })

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
router.post('/actualizar_asiento', crud.actualizar_asiento);




module.exports = router;