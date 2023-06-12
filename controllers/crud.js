const { render } = require('ejs');
const conexion = require('../database/bd');

exports.validacion = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM usuario WHERE correo = ? AND pass = ? AND estado_usuario_id_fk = 1 ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //console.log('ACAAAAAAAAAAAAA',results[0].tipo_usuario_id_fk);
                    if(results[0].tipo_usuario_id_fk === 1){
                        //ENTRA
                        res.render('login',{
                            alert:true,
                            alertTitle: 'Conexion exitosa',
                            alertMessage: 'Bienvenido! ',
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'mantenedor_admin'
                        })
                    }if(results[0].tipo_usuario_id_fk === 2){
                        res.render('login',{
                            alert:true,
                            alertTitle: 'Conexion exitosa',
                            alertMessage: 'Bienvenido! ',
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'mantenedor'
                        })
                    }if(results[0].tipo_usuario_id_fk === 3){
                        res.render('login',{
                            alert:true,
                            alertTitle: 'Conexion exitosa',
                            alertMessage: 'Bienvenido! ',
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'index'
                        })
                    }else{
                        //NO ENTRA
                        res.render('login',{
                            alert:true,
                            alertTitle: 'Error',
                            alertMessage: 'Nombre o contraseña incorrectos!',
                            alertIcon:'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: ''
                        })
                    }
                }
                
            }
        })
    }

}

exports.saveUser =(req, res) => {
    const nombre = req.body.name;
    const correo = req.body.correo;
    const pass = req.body.password;
    const tipo_user = 3;
    conexion.query('INSERT INTO usuario SET ?', { nombre: nombre, correo: correo, pass: pass, estado_usuario_id_fk:1,tipo_usuario_id_fk: tipo_user },(error, results) => {
        if (error) {
            throw error;

        } else {
            res.render('registro', {
                alert: true,
                alertTitle: 'Resgistro',
                alertMessage: 'Registro exitoso!',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    });
}

exports.actualizar_asiento = (req, res) => {

    const valoresTexto = req.body.inputValues; // Valor del campo de entrada como una cadena
    const nuevosValores = valoresTexto.split(','); // Divide la cadena en un array utilizando la coma como separador
    console.log(nuevosValores);


    conexion.query('UPDATE asiento SET ? WHERE id IN (?)', [{estado_asiento_id_fk:2}, nuevosValores], (error, results)=>{
        console.log(results);
        conexion.query('SELECT * FROM asiento', (error, results) => {
            res.redirect('/index');
        })

    })

};

exports.actualizar_asiento_admin = (req, res) => {

    const valoresTexto = req.body.inputValues; // Valor del campo de entrada como una cadena
    const nuevosValores = valoresTexto.split(','); // Divide la cadena en un array utilizando la coma como separador
    console.log(nuevosValores);


    conexion.query('UPDATE asiento SET ? WHERE id IN (?)', [{estado_asiento_id_fk:2}, nuevosValores], (error, results)=>{
        console.log(results);
        conexion.query('SELECT * FROM asiento', (error, results) => {
            res.redirect('/admin');
        })

    })

};

exports.modificarAsiento = (req, res) => {
    const valoresTexto = req.body.inputValues; // Valor del campo de entrada como una cadena

    conexion.query('UPDATE asiento SET ? WHERE id IN (?)', [{estado_asiento_id_fk:2}, nuevosValores], (error, results)=>{
        console.log(results);
        conexion.query('SELECT * FROM asiento', (error, results) => {
            res.redirect('/index');
        })

    })
}

exports.crearAsiento = (req, res) => {

    const codigo = req.body.crearAsiento;

    conexion.query('INSERT INTO asiento SET ?', {numero:codigo, estado_asiento_id_fk: 1, usuario_id_fk: 3},(error, results) =>{
        res.redirect('/mantenedor')

    })

}

exports.crearAsientoAdmin = (req, res) => {

    const codigo = req.body.crearAsientoAdmin;

    conexion.query('INSERT INTO asiento SET ?', {numero:codigo, estado_asiento_id_fk: 1, usuario_id_fk: 3},(error, results) =>{
        res.redirect('/mantenedor_admin')

    })

}

exports.actualizarAsiento = (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.asiento;
    conexion.query('SELECT asiento.id AS id, asiento.numero AS numero, estadoasiento.nombre AS estado FROM asiento INNER JOIN estadoasiento ON asiento.estado_asiento_id_fk = estadoasiento.id', (error, asiento) => {
        conexion.query('UPDATE asiento SET ? WHERE id = ?', [{numero:nombre}, id], (error, results)=>{
            if(error){
                throw error;
            }
            else{
                res.render('EditarAsiento',{
                    alert:true,
                    alertTitle: 'Todo correcto',
                    alertMessage: 'Asiento actualizado correctamente!',
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'mantenedor',
                    asiento : asiento,
                    results:results
                    
                })
            }
        })
    })
    

}

exports.actualizarAsientoA = (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.asiento;
    conexion.query('SELECT asiento.id AS id, asiento.numero AS numero, estadoasiento.nombre AS estado FROM asiento INNER JOIN estadoasiento ON asiento.estado_asiento_id_fk = estadoasiento.id', (error, asiento) => {
        conexion.query('UPDATE asiento SET ? WHERE id = ?', [{numero:nombre}, id], (error, results)=>{
            if(error){
                throw error;
            }
            else{
                res.render('admin/EditarAsientoAdmin',{
                    alert:true,
                    alertTitle: 'Todo correcto',
                    alertMessage: 'Asiento actualizado correctamente!',
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'admin/mantenedor_admin',
                    asiento : asiento,
                    results:results
                    
                })
            }
        })
    })
    

}