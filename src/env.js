const environments = {
  PORT: process.env.PORT || '3000',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'checkmate',
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || '',
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || '',
}

module.exports = environments
