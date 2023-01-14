import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user/user.serivce";
import { UsersController } from "./user/users.controller";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./user/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://protube:test@cluster0.erzbctl.mongodb.net/test",
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://usertest:test@cluster0.m4mrrwq.mongodb.net/test",
    ),
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
