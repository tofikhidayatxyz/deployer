'use strict'

/**
 * Calling process by child attach
 */

const config = require('../config')
const logger = require('./logger')
const chalk = require('chalk')

const { exec } = require('child_process');

const startProcess = (repo, stat)  =>{
    repo.commands.forEach(itm => {
        let stringComand = itm.split('#{branch}').join(stat.branch)
            stringComand = stringComand.split('#{repo}').join(stat.repo)
        const command = exec(stringComand)

        command.stderr.on('data', data => {
            console.log(chalk.red(data))
            logger.create(data, 'error')
        })
        command.stdout.on('data', data => {
            console.log(chalk.green(data.toString()))
            logger.create(data, 'success')
        })
        command.on('close', code => {
            console.log(`Pocess ${chalk.blue(stringComand)} exited with code ${code}`)
            logger.create(`Pocess "${stringComand}" exited with code ${code}`, code == 0 ? 'success': 'error')
        })
    })
}
module.exports = startProcess