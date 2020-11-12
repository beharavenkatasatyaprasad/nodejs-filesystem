const fs = require("fs")
const express = require("express")
const app = express()
const path = require("path")
let currentDate = new Date();
let date = currentDate.getDate();
let month = currentDate.getMonth(); 
let year = currentDate.getFullYear();
let seconds = currentDate.getSeconds();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let dateString = date + "-" +(month + 1) + "-" + year+"_"+hours+":"+minutes+":"+seconds;
let filename= date+"-"+hours+""+minutes+""+seconds;

//endpoint that redirects the user to the api homepage
app.get('/',(req,res)=>{
    res.redirect('/api')
})

//endpoint for the home page
app.get('/api',(req,res)=>{
    res.status(200)
    res.send(`
    <ul>
    <h1>Welcome</h1>
        <li><h1>For Creating a new file in folder use <span style="color:red">/api/createfile</span></h1></li>
        <li><h1>To retreive all the text files in folder use<span style="color:red">/api/retrivefiles</span></h1></li>
    </ul>
    `)
})

//Endpoint to createfile in the folder
app.get('/api/createfile',(req,res)=>{
    fs.writeFile(`./myfolder/${filename}.txt`, `${dateString}`, function (err) {
        if (err) throw err;               
        res.send(`file successfully created`);
        res.end()  
    }); 
    
})

// Endpoint To read files from folder
app.get('/api/retrivefiles',(req,res)=>{
    let getfiles = '';
    fs.readdir("./myfolder/",{ withFileTypes: true },function(err,files){
        if (err) throw err;
        files.forEach(file=>{
            getfiles+=`<li style="color:green;">${file.name}</li>`
        })
        res.status(200)
        res.send(`
                <h2>myfolder contains:</h2>
                <h2>${getfiles}</h2>
                `)
        res.end()
    });
})

// App listening on process port or local host
app.listen(process.env.PORT || 3000)
