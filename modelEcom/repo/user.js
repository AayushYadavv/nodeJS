const fs = require("fs")
const crypto = require("crypto")
const util = require("util")
const scyrpt = util.promisify(crypto.scrypt)
const repo = require("./repo.js")
class usersRepo extends repo{
    async create(attr){
        attr.id=this.randomise()
        const salt = crypto.randomBytes(8).toString('hex');
        const buffer =  await scyrpt(attr.password,salt,64)
        let records = await this.getAll();
        attr.password= buffer.toString("hex")+'.'+salt;
        records.push(attr);
        await this.writeAll(records);
        return attr;

    }
}

module.exports =new usersRepo("user.json")

// const test = async()=>{
//     const user = new usersRepo("user.json");
//     let reco =await user.findOneBy({email:"aas"})
//     console.log(reco)
// }

// test();