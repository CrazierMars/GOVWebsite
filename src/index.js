const express = require('express');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');                        //---------NUEVO----------
const cors = require('cors');                        //---------NUEVO----------
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "A9#dL7mZ!eQ2xP0tVaa654565r5@uG8hNbC1WkEYzM4oTfji",
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());                            //---------NUEVO----------
app.use(express.json());                        //---------NUEVO----------

//Gestion de sesiones
//user
function authMiddleware(req, res, next) {
    if(req.session && req.session.user) {
        next();
    }else{
        res.redirect('/login')
        console.log('Buen intento')
    }
}
// concejal || admin
function authMiddlewareSuper(req, res, next) {
    if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'concejal')) {
        next();
    } else {
        console.log('Buen intento');
        res.redirect('/login');
    }
}
// admin
function adminOnly(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).send('No tienes permisos para acceder aquí');
}

app.get('/logout', (req, res)=>{
    req.session.destroy(err =>{
        if(err) {
            return res.send('No se pudo cerrar la sesion');
        }
        res.redirect('/');
    })
});

//directorio views
app.set('views',path.join(__dirname, 'views'));
// renderizar archivos html con ejs
app.engine('html',require('ejs').renderFile);
app.set('view engine',"ejs");

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

//Archivos estaticos o publicos
app.use(express.static(path.join(__dirname,'public')));

//localhost
app.listen(3001, ()=>{
    console.log("Se conecto al puerto 3001");
});

// GENERAL
app.get("/",(req, res)=>{
    res.render('landing.html',{
        session: req.session
    });
});
app.get("/hmlanding",(req, res)=>{
    res.render('hmlanding.html',{
        session: req.session
    });
});

// // login-registro
app.get("/login",(req, res)=>{
    res.render('login.html',{
        session: req.session
    });
});
app.get("/registro",(req, res)=>{
    res.render('registro.html',{
        session: req.session
    });
});
app.get("/recuperarContrasena",(req, res)=>{
    res.render('recuperar-contrasena.html',{
        session: req.session
    });
});

app.get("/recuperarContrasenaReset",(req, res)=>{
    res.render('recuperar-contrasena-reset.html',{
        session: req.session
    });
});

app.get("/recuperarContrasenaVerificacion",(req, res)=>{
    res.render('recuperar-contrasena-verificacion.html',{
        session: req.session
    });
});
// //secciones
app.get("/denuncias", authMiddlewareSuper,(req, res)=>{
    res.render('perfiles/concejal/denuncias.html',{
        session: req.session
    });
});
app.get("/noticias",(req, res)=>{
    res.render('noticias.html',{
        session: req.session
    });
});

app.get("/noticiaExpanded",(req, res)=>{
    res.render('noticiaExpanded.html',{
        session: req.session
    });
});

app.get("/publicarAviso", authMiddlewareSuper, (req, res)=>{
    res.render('perfiles/concejal/publicarAviso.html', { 
        session: req.session 
    });
});

app.get("/publicarDenuncia", (req, res)=>{
    res.render('publicarDenuncia.html',{
        session: req.session
    });
});

app.get("/avisoExpanded",(req, res)=>{
    res.render('avisoExpanded.html',{
        session: req.session
    });
});

app.get("/publicarNoticia", authMiddlewareSuper, (req, res)=>{
    res.render('perfiles/concejal/publicarNoticia.html', { 
        session: req.session 
    });
});

// //---------------PERFILES---------------
// //       ---------ADMIN---------
app.get("/avisosAdmin", authMiddlewareSuper, (req, res)=>{
    res.render('perfiles/admin/avisosAdmin.html', { 
        session: req.session 
    });
});

app.get("/noticiasAdmin", authMiddlewareSuper, (req, res)=>{
    res.render('perfiles/admin/noticiasAdmin.html', { 
        session: req.session 
    });
});

app.get('/admin/usuarios', authMiddlewareSuper, async (req, res) => {
    const usuarios = await Registro.find().lean();
    res.render('perfiles/admin/usuariosAdmin.ejs', { session: req.session, usuarios });
  });
  
const Denuncia  = require('../models/denunciaSchema');
app.get('/admin/denuncias', authMiddlewareSuper, async (req, res) => {
const denuncias = await Denuncia.find().lean();
res.render('perfiles/admin/denunciasAdmin.ejs', { session: req.session, denuncias });
});

// app.get("/gestorServicios", adminOnly, (req, res)=>{
//     res.render('perfiles/admin/gestorServicios.ejs', {
//         session: req.session
//     });
// });

const enlaceServicio = require('../models/serviciosSchema');

// Devuelve solo los datos del servicio en JSON
app.get('/gestorServicios/:id/json', authMiddleware, adminOnly, async (req, res) => {
    const servicio = await enlaceServicio.findById(req.params.id).lean();
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.json(servicio);
  });
  

// LISTAR + FILTRAR (Category, búsqueda por título…)
app.get('/gestorServicios/', adminOnly, async (req, res) => {
    // 1) Arma el filtro de Mongo
    const filter = {};
    if (req.query.categoria) filter.categoria = req.query.categoria;
    if (req.query.q)          filter.titulo    = new RegExp(req.query.q, 'i');
  
    // 2) Trae los servicios
    const servicios = await enlaceServicio.find(filter).lean();
  
    // 3) Renderiza SIEMPRE pasando servicios y filtros
    res.render('perfiles/admin/gestorServicios.ejs', {
      session: req.session,
      servicios,
      filtros: {
        categoria: req.query.categoria || '',
        q:         req.query.q         || ''
      }
    });
  });

// VER DETALLE
app.get('/gestorServicios/:id', adminOnly, async (req, res) => {
    const servicio = await enlaceServicio.findById(req.params.id).lean();
    if (!servicio) return res.redirect('/gestorServicios');
  
    res.render('/admin/gestorServicios', {
      servicio,
      session: req.session, 
      filtros: {
        categoria: req.query.categoria || '',
        q:         req.query.q || ''
      }
    });
  });

// CREAR (recibe formulario desde modal)
app.post('/gestorServicios/', authMiddleware, adminOnly, async (req, res) => {
    // req.body debe contener: { titulo, descripcion, categoria }
    await enlaceServicio.create(req.body);
    res.redirect('/gestorServicios');
  });

// ACTUALIZAR
app.post('/gestorServicios/:id', authMiddleware, adminOnly, async (req, res) => {
    await enlaceServicio.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    });
    res.redirect('/gestorServicios');
  });

// BORRAR
app.post('/gestorServicios/:id/borrar', authMiddleware, adminOnly, async (req, res) => {
    await enlaceServicio.findByIdAndDelete(req.params.id);
    res.redirect('/gestorServicios');
  });
//
  app.get("/servicioExpanded", (req, res)=>{
    res.render('servicioExpanded.html', {
        session: req.session
    });
});


//currentUser
app.get("/perfilUsuario", authMiddleware, (req, res)=>{
    res.render('perfiles/customer/perfil-usuario.ejs', {
        session: req.session
    });
});

app.put('/api/user', authMiddleware, async (req, res) => {
    try {
      const updates = {};
  
      // Mapea los campos cambiados
      if (req.body.nombre) updates.nombre = req.body.nombre;
      if (req.body.apellidos) {
        const parts = req.body.apellidos.trim().split(/\s+/);
        updates.apellido1 = parts.shift();
        updates.apellido2 = parts.join(' ');
      }
      if (req.body.cedula)    updates.cedula           = req.body.cedula;
      if (req.body.email)     updates.email            = req.body.email;
      if (req.body.distrito)  updates.distritoRegistro = req.body.distrito;
      if (req.body.codigoPostal) updates.codigoPostal = req.body.codigoPostal;
  
      // Aplica el update
      const userId = req.session.user._id;
      const userActualizado = await Registro.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );
  
      // Refresca sesión y responde
      req.session.user = userActualizado;
      res.json({ success: true, user: userActualizado });
    } catch (err) {
      console.error('Error en /api/user:', err);
      res.status(500).json({ success: false, message: 'Error al actualizar perfil' });
    }
  });

app.get("/servicios",(req, res)=>{
    res.render('servicios.html',{
        session: req.session
    }); 
});
app.get("/avisos",(req, res)=>{
    res.render('avisos.html',{
        session: req.session
    });
});

// app.get("/descripcioncustomer",(req, res)=>{
//     res.render('descripcioncustomer.html'); 
// });

// //---------------FUNCIONES POST---------------
//crearCuenta REVISAR
const enlaceRegistro = require('../models/registroSchema.js')
app.post('/postRegistro', (req, res) =>{
    // console.log(req.body);
    // console.log(req.body.nombre);
    // console.log(req.body.apellido1);
    // console.log(req.body.apellido2);
    // console.log(req.body.email);
    // console.log(req.body.cedula);
    // console.log(req.body.numeroTelefono);
    // console.log(req.body.provinciaRegistro);
    // console.log(req.body.cantonRegistro);
    // console.log(req.body.distritoRegistro);
    // console.log(req.body.direccion);
    // console.log(req.body.password2);
    // console.log(req.body.role);

    const data = new enlaceRegistro ({
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        email: req.body.email,
        cedula: req.body.cedula,
        numeroTelefono: req.body.numeroTelefono,
        provinciaRegistro: req.body.provinciaRegistro,
        cantonRegistro: req.body.cantonRegistro,
        distritoRegistro: req.body.distritoRegistro,
        direccion: req.body.direccion,
        password2: req.body.password2
    })
    data.save()
    .then(()=>{
        console.log("registro guardado");
    })
    .catch((err)=>{
        console.log("Error",err);
    })
    res.redirect('/')
})
//Comparar contra la BD - Hacer LOGIN
const Registro = require('../models/registroSchema');  // ajusta la ruta si es necesario

app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;
  const user = await Registro.findOne({ email: username });
  if (user && user.password2 === password) {
    req.session.user = {
        _id:               user._id,
        nombre:            user.nombre,
        apellido1:         user.apellido1,
        apellido2:         user.apellido2,
        email:             user.email,
        cedula:            user.cedula,
        numeroTelefono:    user.numeroTelefono,      
        provinciaRegistro: user.provinciaRegistro,
        cantonRegistro:    user.cantonRegistro,
        distritoRegistro:  user.distritoRegistro,
        direccion:         user.direccion,           
        role:              user.role
    };
    return res.redirect('/perfilUsuario');
  }
  console.log('Error de autenticación', username);
  res.redirect('/login');
});

// //Consulta a la base de datos - PERFIL-USUARIO
//publicarDenuncia
const enlaceDenuncias = require('../models/denunciaSchema.js') 
app.post('/postDenuncia',(req,res)=>{
    const data = new enlaceDenuncias ({
        titulo: req.body.titulo,
        imagenes: req.body.imagenDenuncia,
        select: req.body.select === 'true' ? true : false, 
        descripcion: req.body.contenidoDenuncia, 
        date: req.body.date
    })
    
    data.save()
    .then(()=>{
        console.log("denuncias guardadas");
    })
    .catch((err)=>{
        console.log("Error",err);
    })
    res.redirect('/')
});

//publicarAviso
const enlaceAvisos = require('../models/avisoSchema.js')
app.post('/postAviso', authMiddleware,(req, res)=>{

    const data = new enlaceAvisos ({
        titulo: req.body.titulo,
        imagenes: req.body.imagenNoticia,
        descripcion: req.body.contenidoAviso, 
        date: req.body.date
    })
    data.save()
    .then(()=>{
        console.log("avisos guardados");
    })
    .catch((err)=>{
        console.log("Error",err);
    })
    res.redirect('/')

})

//publicarNoticia
const enlaceNoticias = require('../models/noticiaSchema.js')
app.post('/postNoticia',(req, res)=>{

    const data = new enlaceNoticias ({
        titulo: req.body.titulo,
        imagenes: req.body.imagenNoticia,
        descripcion: req.body.contenidoNoticia, 
        date: req.body.date
    })
    data.save()
    .then(()=>{
        console.log("noticias guardadas");
    })
    .catch((err)=>{
        console.log("Error",err);
    })
    res.redirect('/')

})


app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    const { codigoVerificacion } = req.body; // Obtener el código de verificación del cuerpo de la solicitud
  
    // Busca el código de verificación en la base de datos
    const enlace = await enlaceCodigo.findOne({ codigo:codigoVerificacion});
    console.log('Codigo de verificacion:', codigoVerificacion);
    if (!enlace) {
      return res.status(404).send({ error: 'Código no encontrado' });
    }
  
    // Configura el transporte
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hummingbird.solutions.sa@gmail.com',
        pass: 'gaiu woad xwyo cret', 
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    // Define las opciones del correo
    const mailOptions = {
      from: 'hummingbird.solutions.sa@gmail.com',
      to: to,
      subject: 'Tu código de verificación para la Municipalidad Montes de Oca',
      text: `Hola,

            Recibimos una solicitud para restablecer tu contraseña.

            Tu código de verificación es: ${codigoVerificacion}

            Ingresa este código en la página de recuperación para continuar con el proceso.

            Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.

            Atentamente,  
            El equipo de Hummingbird Solutions,`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Correo enviado!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al enviar el correo' });
    }
});



  //Codigos de verificacion
const enlaceCodigo = require('../models/codigosSchema.js');
app.post('/verificarUsuarioExiste', async (req, res) => {
    try {
      const correo = req.body.correo;
      console.log(correo);
  
      const existe = true; 
      if (!existe) return res.json({ existe: false });
  
      const codigo = Math.floor(100000 + Math.random() * 900000); // Genera código 6 dígitos
  
      const estado = true;
      const data = new enlaceCodigo({
        codigo,
        email: correo,
        date: obtenerFechaActual(),
        estado
      });
  
      await data.save();
      console.log("Código guardado");
  
      return res.json({ existe: true, codigo }); // Se envía el código de vuelta al cliente
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
  
  const moment = require('moment');

  function obtenerFechaActual() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
  }