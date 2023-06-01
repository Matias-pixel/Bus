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

router.get('/superadmin', (req, res) => {

    conexion.query('SELECT usuario.id, usuario.nombre, usuario.correo, estadousuario.nombre AS estadouser, tipousuario.nombre AS tipouser FROM usuario INNER JOIN tipousuario ON tipousuario.id = usuario.tipo_usuario_id_fk INNER JOIN estadousuario ON estadousuario.id = usuario.estado_usuario_id_fk',(error , results) =>{
        if(error){
            throw error;
        }else{
            res.render('superadmin' ,{results:results})
        }
    })
})


const crud = require('./controllers/crud');


router.post('/validacion',crud.validacion);
router.post('/saveUser', crud.saveUser);
router.post('/actualizar_asiento', crud.actualizar_asiento);




module.exports = router;