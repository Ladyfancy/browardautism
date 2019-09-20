const express = require('express');
const router  = express.Router();

const Service  = require('../models/service'); 




router.get('/services', (req, res, next)=>{
    Service.find()
    .then((allTheServices)=>{
        console.log(req.session.currentUser)

        res.render('services', {services: allTheServices})

    })
    .catch((err)=>{
        next(err);
    })

})

router.get('/services/details/:theid', (req, res, next)=>{
    let id = req.params.theid

    Service.findById(id)
    // .populate('Service')
    .then((serviceObject)=>{

        res.render('services/details', {theService: serviceObject})

    })
    .catch((err)=>{
        next(err);
    })
})



router.get('/services/create-new-service', (req, res, next)=>{


        
        res.render('services/new-service');
   
    

})



router.post('/services/creation', (req, res, next)=>{

    console.log('=-=-=--=--=', req.body)

    let name = req.body.theName;
    let occupation = req.body.theOccupation;
    let catchphrase = req.body.theCatchphrase;


    Service.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchphrase
    })
    .then((result)=>{

        res.redirect('/services')
        //its literally sending us to localhost:3000/services

    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/services/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    Service.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/services')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/services/edit/:id', (req, res, next)=>{
    let id=req.params.id;

    Service.findById(id)
    .then((theService)=>{
        res.render('services/edit', {Service: theService})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/services/update/:id', (req, res, next)=>{

    let id=req.params.id;

    Service.findByIdAndUpdate(id, {

        name: req.body.theName,
        occupation: req.body.theOccupation,
        catchPhrase: req.body.theCatchphrase

    })
    .then((result)=>{
        res.redirect('/services/details/'+id)
    })
    .catch((err)=>{
        next(err);
    })

})


module.exports = router;


