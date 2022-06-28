import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import conf from 'package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('FT_Transcendance 42')
    .setDescription(
      "L'API du backend du transcendance de tbelhomm, pleveque et ...",
    )
    .setVersion(conf.version)
    .addTag('Authentification')
    .addOAuth2({
      name: 'Intra 42',
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://api.intra.42.fr/oauth/authorize',
          tokenUrl: 'https://api.intra.42.fr/oauth/token',
          scopes: {
            public:
              "Récupérer les informations de base du profile de l'utilisateur",
          },
        },
      },
    })
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addServer('http://localhost:3000/', 'Serveur Local')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'http://localhost:3000/auth/login',
    },
  });

  await app.listen(3000);
}
bootstrap();
