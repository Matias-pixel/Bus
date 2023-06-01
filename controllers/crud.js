const conexion = require('../database/bd');

exports.validacion = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM usuario WHERE correo = ? AND pass = ? WHERE estado_usuario_id_fk = 1 ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: 'Bienvenido! ',
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'respaldo'
                       
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