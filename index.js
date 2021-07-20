const mongoose=require('mongoose')
const express=require('express');
const helmet = require('helmet');
const app=express();
const z=require('./models/maildb')


mongoose.connect('mongodb://127.0.0.1:27017',{ useUnifiedTopology: true , useNewUrlParser: true , useFindAndModify:true }).then(()=>console.log('db is connected ')).catch((err)=>console.log(`db is failed ${err}`))

// //middleware
app.use(express.json());
app.use(helmet()); 
const cors = require('cors');
app.use(cors()); 

app.get('/',(req,res)=>{
    res.send('app is running')
    res.send()
})

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{ 
    console.log(`server running on port number ${PORT}` )
    console.log(`server running on port number http://localhost:${PORT}` )
})