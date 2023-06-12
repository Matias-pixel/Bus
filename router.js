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

router.get('/mantenedor', (req, res)=>{
    conexion.query('SELECT asiento.id AS id, asiento.numero AS numero, estadoasiento.nombre AS estado FROM asiento INNER JOIN estadoasiento ON asiento.estado_asiento_id_fk = estadoasiento.id', (error, asiento) => {
        if(error){
            throw error;
        }else{
            res.render('mantenedor' ,{asiento:asiento})
        }
    })
    
})

router.get('/admin', (req, res)=>{
    conexion.query('SELECT * FROM asiento', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('admin/admin' ,{results:results})
        }
    })
    
})

router.get('/mantenedor_admin', (req, res)=>{
    conexion.query('SELECT asiento.id AS id, asiento.numero AS numero, estadoasiento.nombre AS estado FROM asiento INNER JOIN estadoasiento ON asiento.estado_asiento_id_fk = estadoasiento.id', (error, asiento) => {
        if(error){
            throw error;
        }else{
            res.render('admin/mantenedor_admin' ,{asiento:asiento})
        }
    })
    
})

router.get('/respaldo_admin',(req, res)=>{
    res.render('admin/respaldo_admin');
});





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
            res.render('admin/superadmin' ,{results:results})
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
            res.render('admin/usuariosDes' ,{results:results})
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

router.get('/editAsientoA/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM asiento WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/editarAsientoAdmin', {results:results[0]})
        }
    })
})

router.get('/editAsiento/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM asiento WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('editarAsiento', {results:results[0]})
        }
    })
})

router.get('/habilitarAsientoA/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE asiento SET estado_asiento_id_fk = 1 WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/mantenedor_admin')
        }
    })
})

router.get('/habilitarAsiento/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE asiento SET estado_asiento_id_fk = 1 WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/mantenedor')
        }
    })
})



const crud = require('./controllers/crud');


router.post('/validacion',crud.validacion);
router.post('/saveUser', crud.saveUser);
router.post('/actualizar_asiento', crud.actualizar_asiento);

router.post('/crearAsiento', crud.crearAsiento);
router.post('/actualizar_asiento_admin', crud.actualizar_asiento_admin);
router.post('/crearAsientoAdmin', crud.crearAsientoAdmin);


//MIOS
router.post('/actualizarAsiento', crud.actualizarAsiento);
router.post('/actualizarAsientoA', crud.actualizarAsientoA);

module.exports = router;