const express = require('express');
const { json } = require('express');
const path = require('path');

const conexion = require('./database/bd');
const { exec } = require('child_process');
const fs = require('fs');
const multer = require('multer');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(json));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para cargar el archivo SQL y ejecutar la consulta
app.post('/cargarRespaldo', upload.single('archivo'), (req, res) => {

    const sqlFilePath = req.file.path;
    console.log('sqlFilePath :>> ', sqlFilePath);
  
    fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
      if (err) {
        console.error('Error al leer el archivo SQL:', err);
        return;
      }
    
      // Ejecución del archivo SQL en la base de datos
      conexion.query(sql, (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta SQL:', error);
          return;
        }
    
        console.log('Archivo SQL importado correctamente en la base de datos.');
      });
    });
  
});



//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Permitir ver imagenes señores
app.use(express.static(path.join(__dirname,'public')));

function backup() {

    const now = Date.now();
    const backupCommand = "C:\\xampp\\mysql\\bin\\mysqldump -u root bus > "+now+"backup.sql";
  
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al hacer el respaldo: ${error.message}`);
        console.log('Error al hacer el respaldo de la base de datos.');
      }
      if (stderr) {
        console.error(`Error al ejecutar el comando: ${stderr}`);
        console.log('Error al ejecutar el comando mysqldump.');
      }
  
      const sourcePath = now+'respaldo.sql';
      const destinationPath = path.join(__dirname, 'public', 'respaldos', now+'respaldo.sql');
  
      fs.rename(sourcePath, destinationPath, (error) => {
        if (error) {
          console.error(`Error al mover el archivo de respaldo: ${error.message}`);
          console.log('Error al mover el archivo de respaldo.');
        }
        console.log('Respaldo de base de datos completado y archivo movido correctamente.');
        console.log('Respaldo de base de datos completado.');
      });
    });
  
  
}

app.get('/respaldoo', (res,req) => {
    backup();
});


app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log("Server corriendo");
});