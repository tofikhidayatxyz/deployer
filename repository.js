 'use strict'

 const repositories = [
     {
         name: 'tofikhidayat/smart-deployer',
         branch: '*',
         timeout: 300,
         commands: [
            //  'cd /var/ && ls -a',
            //  'ls -a',
             'echo #{branch} #{repo}'
         ] 
     }
 ]


 module.exports = repositories
