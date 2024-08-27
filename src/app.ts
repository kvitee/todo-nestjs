import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";


export async function startApp() {
  const port = Number(process.env.PORT) || 5000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle("To-Do App")
    .setDescription("To-Do application created with Nest.js")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  app.listen(port, () => {
    console.log(`Listening on localhost:${port}...`);
  });
}
