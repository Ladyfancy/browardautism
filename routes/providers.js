const express = require('express');
const router  = express.Router();

const Provider  = require('../models/Provider'); 


router.get('/', (req, res, next)=>{
    Provider.find()
    .then((allTheProviders)=>{
        console.log(allTheProviders)

        res.render('providers', {allTheProviders})

    })
    .catch((err)=>{
        next(err);
    })

})

router.get('/providerdetails/:theid', (req, res, next)=>{
    let id = req.params.theid

    Provider.findById(id)
    
    .then((providerObject)=>{

        console.log(providerObject)

        res.render('providers/providerdetails', {theProvider: providerObject})

    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/create-new-provider', (req, res, next)=>{

        
        res.render('providers/new-provider');
    // })
    // .catch((err)=>{
    //     next(err)
    // })
    
})

router.post('/creation', (req, res, next)=>{

    console.log('=-=-=--=--=', req.body)

    let name = req.body.theName;
    let director = req.body.theDirector;
    let website = req.body.theWebsite;


    Provider.create({
        name: name,
        director: director,
        website: website
    })
    .then((result)=>{
        console.log(result)

        res.redirect('/providers')

    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    console.log("We are deleting it")

    Provider.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/providers')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/editproviders/:id', (req, res, next)=>{
    let id=req.params.id;

   Provider.findById(id)
    .then((theProvider)=>{
        res.render('providers/editproviders', {provider: theProvider})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/update/:id', (req, res, next)=>{

    let id=req.params.id;

    Provider.findByIdAndUpdate(id, {

        title: req.body.theTitle,
        director: req.body.theDirector,
        website: req.body.thewebsite

    })
    .then((result)=>{
        res.redirect('/providers/providerdetails/'+id)
    })
    .catch((err)=>{
        next(err);
    })

})

module.exports = router;


