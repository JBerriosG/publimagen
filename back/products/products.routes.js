const admin = require('firebase-admin');
const serviceAccount = require('../publimagen-c4b20-8e939c2e18d5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://publimagen-c4b20.firebaseio.com/',

});


const db = admin.database();

module.exports = (router) => {

    /* Servicios */
    router.post('/add', (req, res) => {
        const solucion = {
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
            companyName: req.body.companyName,
            urlImage: req.body.urlImage
        }
        db.ref('soluciones').push(solucion);
        res.send({message:'creado con exito!'});
    });
    router.get('/products', (req, res) => {
        const ref = db.ref('soluciones');
        ref.once("value", function (snapshot) {
            const data = snapshot.val();
            
            res.send(data);
        });
    });
    router.get('/products/:id', (req, res) => {
        const ref = db.ref('soluciones/' + req.params.id);
        ref.once("value", function (snapshot) {
            const data = snapshot.val();
            res.send({ solucion: data , id: req.params.id});
        });
    });
    router.put('/update/:id', (req, res) => {
        if(req.body.urlImage){
            var  solucion = {
                userId: req.body.userId,
                name: req.body.name,
                description: req.body.description,
                companyName: req.body.companyName,
                urlImage: req.body.urlImage
            }
        }else{
            var  solucion = {
                userId: req.body.userId,
                name: req.body.name,
                description: req.body.description,
                companyName: req.body.companyName
            }
        }
        db.ref('soluciones/' + req.params.id).update(solucion);
        res.send({message:'Actualizado con exito'});
    });
    router.delete('/delete/:id', (req, res) => {
        db.ref('soluciones/' + req.params.id).remove();
        res.send({message:'Elimado con exito'});
    });

    /* Trabajos */
    router.post('/addPost', (req, res) => {
        const trabajo = {
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
            companyName: req.body.companyName,
            urlImage: req.body.urlImage
        }
        console.log(trabajo);
        db.ref('trabajos').push(trabajo);
        res.send({message:'creado con exito!'});
    });
    router.get('/posts', (req, res) => {
        const ref = db.ref('trabajos');
        ref.once("value", function (snapshot) {
            const data = snapshot.val();
            
            res.send(data);
        });
    });
    router.get('/posts/:id', (req, res) => {
        const ref = db.ref('trabajos/' + req.params.id);
        ref.once("value", function (snapshot) {
            const data = snapshot.val();
            res.send({ trabajo: data , id: req.params.id});
        });
    });
    router.put('/updatePost/:id', (req, res) => {
        if(req.body.urlImage){
            var trabajo = {
                userId: req.body.userId,
                name: req.body.name,
                description: req.body.description,
                companyName: req.body.companyName,
                urlImage: req.body.urlImage
            }
        }else{
            var trabajo = {
                userId: req.body.userId,
                name: req.body.name,
                description: req.body.description,
                companyName: req.body.companyName
            }
        }
        db.ref('trabajos/' + req.params.id).update(trabajo);
        res.send({message:'Actualizado con exito'});
    });
    router.delete('/deletePost/:id', (req, res) => {
        db.ref('trabajos/' + req.params.id).remove();
        res.send({message:'Elimado con exito'});
    });
}