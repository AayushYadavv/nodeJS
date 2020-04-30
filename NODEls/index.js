#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const util = require("util")
const chalk = require("chalk")

const dir = process.argv[2] || process.cwd()


const statL = util.promisify(fs.lstat) 
fs.readdir(dir,async(err,files)=>{
    if(err){
        console.log(err);
    } 

    const prom = files.map((file)=>{
        return statL(path.join(process.cwd(),file))
    })

    const statarra = await Promise.all(prom);

    index = 0;
    for (let st  of statarra){

        if(st.isFile()){
        console.log(chalk.bold(files[index]));
        }else{
            console.log(chalk.blue(files[index])); 
        }
        index = index + 1;

    }
    

        
    
    
})