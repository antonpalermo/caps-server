/**
 * @type { import('typeorm').ConnectionOptions }
 */
const config = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: ['dist/**/*.entities{.js|.ts}'],
  logging: process.env.NODE_ENV === 'development'
}

module.exports = config
