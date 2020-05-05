/** @format */

const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scyrpt = util.promisify(crypto.scrypt);
class Repo {
  constructor(filename) {
    if (!filename) {
      return console.log("Provide a file.");
    }

    try {
      fs.accessSync(filename);
    } catch (err) {
      fs.writeFileSync(filename, "[]");
    }

    this.filename = filename;
  }
  randomise() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getAll() {
    let content = await JSON.parse(await fs.promises.readFile(this.filename));
    return content;
  }
  async create(attr) {
    attr.id = this.randomise();

    let records = await this.getAll();

    records.push(attr);
    await this.writeAll(records);
    return attr;
  }
  async passvalidator(recieved, stored) {
    const [password, salt] = stored.split(".");
    const hashedPass = await scyrpt(recieved, salt, 64);
    if (password === hashedPass.toString("hex")) {
      return true;
    }
    return false;
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      await JSON.stringify(records, null, 2)
    );
  }
  async delete(id) {
    let records = await this.getAll();
    const newRec = records.filter((record) => {
      return record.id !== id;
    });

    await this.writeAll(newRec);
  }
  async findByid(id) {
    let records = await this.getAll();
    let findRecord = records.find((record) => {
      return record.id === id;
    });

    return findRecord;
  }
  async update(attr) {
    let records = await this.getAll();
    let findRecord = records.find((record) => {
      return record.id === attr.id;
    });
    Object.assign(findRecord, attr);
    await this.writeAll(records);
  }
  async findOneBy(attr) {
    let records = await this.getAll();
    for (let record of records) {
      let found = true;

      for (let key in attr) {
        if (attr[key] === record[key]) {
          found = found && true;
        } else {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
    return false;
  }
}

module.exports = Repo;

// const test = async()=>{
//     const user = new usersRepo("user.json");
//     let reco =await user.findOneBy({email:"aas"})
//     console.log(reco)
// }

// test();
