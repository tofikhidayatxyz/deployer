#!/usr/bin/env node

/**
 * Smart deployer with express
 */

const http = require('http')
const express = require('express')
const logger = require('morgan')
const config = require('../config')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const process = require('./process')
const repositories = require('../repository')
const githubMiddleware = require('github-webhook-middleware')({
    secret: config.secret,
    limit: '20mb',
  })

const app  = express()
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router here
app.post(config.path, githubMiddleware, (req, res) => {
    if (req.headers['x-github-event'] != 'push') return res.status(200).end()

    const payload = JSON.parse(req.body.payload)
    const repo    = payload.repository.full_name
    const branch  = payload.ref.split('/').pop()
    console.log(repo)
    console.log(branch)
    repositories.forEach(itm => {
        if(itm.repo.toLowerCase() == repo.toLowerCase() && (itm.branch.toLowerCase() == branch.toLowerCase() || itm.branch == '*')) {
            process.start(itm, {
                repo,
                branch
            })
        }
    })

    res.status(200)
    res.send('ok')
    res.end()
})

app.use((req, res) => {
    res.status(404)
    res.send({
        status: 404,
        message: `Sorry this path ${req.protocol}://${req.hostname}${req.url} are not found`
    })
    return res.end()
})
// end router
const server = http.createServer(app)
server.listen(config.port, config.host, () => {
    console.log(`[Deployer] listen on http://${chalk.blue(config.host)}:${chalk.blue(config.port)}`)
})

server.on('error', error => {
    console.error(error)
})