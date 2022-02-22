import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      credentials: true
    }
  })

  app.enableVersioning({
    type: VersioningType.URI
  })

  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
}
bootstrap()
