 'use strict'

 const repositories = [
     {
         repo: 'tofikhidayat/byebyefever',
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
