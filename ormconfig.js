const __dev = process.env.NODE_ENV === 'development'

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
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: __dev,
  synchronize: __dev,
  cli: {
    migrationsDir: 'migrations'
  }
}

module.exports = config
