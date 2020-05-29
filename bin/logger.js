const logger = require('log-to-file');
const path =  require('path')
const mkdirp = require('mkdirp');
const fs =  require('fs')


const create = (message, type) => {
    const date = new Date();  
    const timing = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    const file = path.join(__dirname, `../logs/${timing}/${type}.log`)
    const dir  = path.join(__dirname, `../logs/${timing}`);
    const createLoger = () => {
        logger(message, file)
    }
    const creator = () => {
        fs.exists(file, (res) => {
            if(!res) {
                fs.writeFile(file, `---  ${type} ---`, (err) => {
                    if(err) {
                        return console.log(err)
                    } else {
                        createLoger()
                    }
                })
            } else {
                createLoger()
            }
        })
    }

    fs.exists(path.join(__dirname, `../logs/${timing}`), (res)=>{
       if(!res) {
            mkdirp(dir)
            .then(res => {
                console.log(`Directory ${dir} created`);
                createLoger();
            })
            .catch(err => {
                console.error(err)
            })
       } else {
         createLoger();
       }
    })
   
}

module.exports = {
    create
}