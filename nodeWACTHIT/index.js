#!/usr/bin/env node 
const chokidar = require("chokidar")
const debounce = require("lodash.debounce")
const fs = require("fs")
const {spawn}=require("child_process")
const filename = process.argv[2] || "index.js"

let proc;
const start = debounce(async()=>{
    try{
     await fs.promises.access(filename)
    }catch(err){
        console.log("File not Found !")
    }
    if(proc){
        proc.kill();
    }
    proc = spawn("node",[filename],{stdio:"inherit"})
    
},100)

chokidar.watch(".")
                .on("add",start)
                .on("change",start)
                .on("unlink",start);
