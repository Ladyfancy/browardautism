const express = require('express');
const router  = express.Router();

const Provider  = require('../models/Provider'); 


router.get('/providers', (req, res, next)=>{
    Provider.find()
    .then((allTheProviders)=>{
        console.log(allTheProviders)

        res.render('providers', {allTheProviders})

    })
    .catch((err)=>{
        next(err);
    })

})

router.get('/providers/providerdetails/:theid', (req, res, next)=>{
    let id = req.params.theid

    Provider.findById(id)
    // .populate('provider')
    .then((providerObject)=>{

        console.log(providerObject)

        res.render('providers/providerdetails', {theProvider: providerObject})

    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/providers/create-new-provider', (req, res, next)=>{

    // we need a list of all the providers on this page so we do
    // provider.find()
    // .then((result)=>{
        
        res.render('providers/new-provider');
    // })
    // .catch((err)=>{
    //     next(err)
    // })
    
})

router.post('/providers/creation', (req, res, next)=>{

    console.log('=-=-=--=--=', req.body)

    let title = req.body.theTitle;
    let director = req.body.theDirector;
    let website = req.body.theWebsite;


    Provider.create({
        title: title,
        director: director,
        website: website
    })
    .then((result)=>{

        res.redirect('/providers')
        //its literally sending us to localhost:3000/providers

    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/providers/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    Provider.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/providers')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/providers/editproviders/:id', (req, res, next)=>{
    let id=req.params.id;

   Provider.findById(id)
    .then((theProvider)=>{
        res.render('providers/editproviders', {provider: theProvider})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/providers/update/:id', (req, res, next)=>{

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


