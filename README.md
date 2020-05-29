# Deployer 
Helping developer for CI/CD 

## Requirement
- php 7.* [https://www.php.net/releases/7_4_0.php](https://www.php.net/releases/7_4_0.php)
- Composer [https://getcomposer.org/](https://getcomposer.org/)
- Nodejs [https://nodejs.org/en/](https://nodejs.org/en/)

## Installation
- Install laravel envoy [https://laravel.com/docs/7.x/envoy](https://laravel.com/docs/7.x/envoy)
- install pm2 `$ npm i pm2 -g`
- Goto your directory  example "/var/www/"
- Clone this repository  `$ git clone https://github.com/tofikhidayat/deployer.git deployer`
- `$ cd deployer`
- `$ npm install`
- Edit the configuration change the secret key and route (if you want)
- Edit repository 
	- branch ex:*, development, master 
	- repo ex: tofikhidayat/deployer
	- timeout: not working for now
	-  commands ex: `git pull origin {branch}` or  as root `/root/.composer/vendor/bin/envoy run deploy`
- Add service to pm2 `$ pm2 start ecosystem.config.js`
- Add pm2 to startup `$ pm2 startup `
- Create Envoy task example: [https://laravel.com/docs/7.x/envoy#writing-tasks](https://laravel.com/docs/7.x/envoy#writing-tasks)
- 

## Note 
- Not working for local 
- Current process is not sycncronus
- Based on nodejs child process
- Logs allready in directtory logs/{date}/{type}.log

# Todo
- sycronus process
- web ui

# Attention
Please help me for improving this repository