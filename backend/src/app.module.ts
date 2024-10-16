import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase.service'; 

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
  exports: [FirebaseService],
})
export class AppModule {}
