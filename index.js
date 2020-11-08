const fs = require("fs")
const http = require("http")
const path = require("path")

let currentDate = new Date();

let date = currentDate.getDate();
let month = currentDate.getMonth(); 
let year = currentDate.getFullYear();
let seconds = currentDate.getSeconds();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let dateString = date + "-" +(month + 1) + "-" + year+"_"+hours+""+minutes+""+seconds;
let filename= date+"-"+hours+""+minutes+""+seconds;




// To create txt file and to write timestamp content in it
let writeStream = fs.createWriteStream(`${filename}.txt`);
writeStream.write(`${dateString}`);

writeStream.end();  


// To read files from folder
let s = "";
    fs.readdir("./",{ withFileTypes: true },function(err,files){
        if (err) throw err;
        files.forEach(file=>{
            if(file.isDirectory()){
                s+=`<li style="color:black;">${file["name"]}</li>`
            }else if (file.isFile()){
                s+=`<li>${file["name"]}</li>`
            }
        })
    });

    
// To display in webpage
http.createServer(function(req,res){
    res.writeHead(200,{'content-Type':'text-html'})
    res.write(`<h1>${s} </h1>`)
    res.end()
}).listen(process.env.PORT)


