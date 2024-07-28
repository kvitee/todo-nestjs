import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";


export async function startApp() {
  const port = Number(process.env.PORT) || 5000;
  const app = await NestFactory.create(AppModule);

  app.listen(port, () => {
    console.log(`Listening on localhost:${port}...`);
  });
}
