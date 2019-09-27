const mongoose     = require('mongoose');
const Service = require("../models/Ha")
const Provider = require("../models/Provider")
const Event = require("../models/Event")
// const dbTitle = 'lab-cinema-generator'

let services = [
  {
name: "ABA",
description: "Fixing Problem or Undesired Behaviors",
   
  },
  {
      name: "Speech Therapy",
      
      description: "They Get Them Speaking and Using Language"
  },
  {
      name: "Occupational Therapy",
      
      description: "Writing, Buttoning, Using Hands, etc"
  },
  {
    name: "Physical Therapy",
   
    description: "They Improve Movement Skills like Walking"
},
]

const providers = [
  {
    title : "JAFCO",
    director: "Justin",
    website: "https://www.jafco.org",
    description: "Respite, Activities, Training, Support Groups, Social Work and Information.",
    phonenumber: "954-999-9999"
  },
  {
    title : "UM/NOVA CARD",
    director: "N/A",
    website: "https://www.jafco.org",
    description: "Helping Families with Services for Autism",
    phonenumber: "954-999-9999"
  },
  
  {
    title : "PBS Therapy",
    director: "Mariana",
    website: "https://pbstherapy.com",
    description: "At Home ABA Services",
    phonenumber: "954-999-9999"
  },
  
 
];

let event = [
  {
name: "Fall at JAfCO",
date: "October 27th, 2019" ,
eventtime: "10:00 am",
location: "JAFCO",
price: "$5"   
  },
  {
name: "Grandparent's Support",
date: "Thursdays" ,
eventtime: "10:00 am",
location: "JAFCO",
price: "$5" 
  },
]

mongoose.connect(`mongodb+srv://ironhack:ironhack1@cluster0-ifpkg.mongodb.net/test?retryWrites=true&w=majority`)

.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  Provider.insertMany(providers)
  .then(mov=>{
      console.log(mov)
  })
  .catch(err=>console.error(err))
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

Provider.create(providers)
.then(data=>{
  console.log(data)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});





