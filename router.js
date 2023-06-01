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

    conexion.query('SELECT usuario.id, usuario.nombre, usuario.correo, usuario.pass, estadousuario.nombre as estadoNombre, tipousuario.nombre as tipoNombre from usuario INNER JOIN estadousuario ON estadousuario.id = usuario.estado_usuario_id_fk inner join tipousuario ON tipousuario.id = usuario.tipo_usuario_id_fk WHERE estado_usuario_id_fk = 1 AND tipo_usuario_id_fk != 1',(error , results) =>{
        if(error){
            throw error;
        }else{
            res.render('superadmin' ,{results:results})
        }
    })
})

//RUTA PARA 

router.get('/deleteUser/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE usuario SET estado_usuario_id_fk = 2 WHERE id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/superadmin')
        }
    })
})

router.get('/usuariosDes', (req, res) => {

    conexion.query('SELECT usuario.id, usuario.nombre, usuario.correo, usuario.pass, estadousuario.nombre as estadoNombre, tipousuario.nombre as tipoNombre from usuario INNER JOIN estadousuario ON estadousuario.id = usuario.estado_usuario_id_fk inner join tipousuario ON tipousuario.id = usuario.tipo_usuario_id_fk WHERE estado_usuario_id_fk = 2',(error , results) =>{
        if(error){
            throw error;
        }else{
            res.render('usuariosDes' ,{results:results})
        }
    })
})

router.get('/habilitarUser/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE usuario SET estado_usuario_id_fk = 1 WHERE id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/superadmin')
        }
    })
})


const crud = require('./controllers/crud');


router.post('/validacion',crud.validacion);
router.post('/saveUser', crud.saveUser);
router.post('/actualizar_asiento', crud.actualizar_asiento);




module.exports = router;