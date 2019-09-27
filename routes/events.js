const express = require('express');
const router  = express.Router();

const Event  = require('../models/Event'); 
// const Provider  = require('../models/Provider'); 


router.get('/', (req, res, next)=>{
    Event.find()
    .then((allTheEvents)=>{
        console.log(allTheEvents)

        res.render('events/event-list', {allTheEvents})

    })
    .catch((err)=>{
        next(err);
    })

})

router.get('/eventdetails/:theid', (req, res, next)=>{
    let id = req.params.theid

    Event.findById(id)
    
    .then((eventObject)=>{

        console.log(eventObject)

        res.render('events/eventdetails', {theEvent: eventObject})

    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/create-new-event', (req, res, next)=>{
        res.render('events/new-event');
})

router.post('/creation', (req, res, next)=>{
    console.log('=-=-=--=--=', req.body)

    let name = req.body.theName;
    let date = req.body.theDate;
    let time = req.body.theTime;
    let location = req.body.theLocation;
    let price = req.body.thePrice;


    Event.create({
        name: name,
        date: date,
        time: time,
        location: location,
        price: price,
    })
    .then((result)=>{
        res.redirect('/events')
    })
    .catch((err)=>{
        next(err);
    })
})

router.post('/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    Event.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/events')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/editevents/:id', (req, res, next)=>{
    let id=req.params.id;

   Event.findById(id)
    .then((theEvent)=>{
        res.render('events/editevents', {provider: theEvent})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/update/:id', (req, res, next)=>{

    let id=req.params.id;

    Event.findByIdAndUpdate(id, {
        name: req.body.theName,
        date: req.body.theDate,
        time: req.body.theTime,
        location: req.body.theLocation,
        price: req.body.thePrice

    })
    .then((result)=>{
        res.redirect('/events/eventdetails/'+id)
    })
    .catch((err)=>{
        next(err);
    })

})

module.exports = router;