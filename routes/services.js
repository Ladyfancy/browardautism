const express = require('express');
const router  = express.Router();

const Service  = require('../models/Ha'); 




router.get('/', (req, res, next)=>{
    Service.find()
    .then((allTheServices)=>{
        console.log(req.session.currentUser)

        res.render('services', {services: allTheServices})

    })
    .catch((err)=>{
        next(err);
    })

})

router.get('/details/:theid', (req, res, next)=>{
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



router.get('/create-new-service', (req, res, next)=>{


        
        res.render('services/new-service');
   
    

})



router.post('/creation', (req, res, next)=>{

    console.log('=-=-=--=--=', req.body)

    let name = req.body.theName;
    
    let description = req.body.theDescription;


    Service.create({
        name: name,
      
        description: description
    })
    .then((result)=>{

        res.redirect('/services')
        //its literally sending us to localhost:3000/services

    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    Service.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/services')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/edit/:id', (req, res, next)=>{
    let id=req.params.id;

    Service.findById(id)
    .then((theService)=>{
        res.render('services/edit', {Service: theService})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/update/:id', (req, res, next)=>{

    let id=req.params.id;

    Service.findByIdAndUpdate(id, {

        name: req.body.theName,
       
        description: req.body.thedescription

    })
    .then((result)=>{
        res.redirect('/services/details/'+id)
    })
    .catch((err)=>{
        next(err);
    })

})


module.exports = router;


