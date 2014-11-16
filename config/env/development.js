'use strict';

module.exports = {
  db: 'mongodb://thu:thu@106.185.44.133/phycolab',
	debug: 'true',
  mongoose: {
    debug: true
  },
  app: {
    name: '清华大学心理实验报名平台'
  },
  facebook: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'psy2013_tsinghua@163.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: '163', // Gmail, SMTP
    domains: ['163.com'],
    host: 'smtp.163.com',
    port: 25,
    auth: {
      user: 'psy2013_tsinghua@163.com',
      pass: 'psy2013'
    }
  }
};
