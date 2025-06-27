import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './practice/user/user.module';
import { UsersModule } from './twitter/users/users.module';
import { TweetsModule } from './twitter/tweets/tweets.module';
import { MediaModule } from './twitter/media/media.module';
import { CommentsModule } from './twitter/comments/comments.module';
import { LikesModule } from './twitter/likes/likes.module';
import { User } from './twitter/users/entities/user.entity';
import { Media } from './twitter/media/entities/media.entity';
import { Tweet } from './twitter/tweets/entities/tweet.entity';
import { Like } from './twitter/likes/entities/like.entity';
import { Comment } from './twitter/comments/entities/comment.entity';
import { BluetickModule } from './twitter/payments/bluetick.module';
import { BlueTick } from './twitter/payments/entities/bluetick.entity';
import { AppService } from './app.sservices';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<string>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User,Media,Tweet,Like,Comment,BlueTick],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // migrations: [__dirname + '/migrations/*{.ts,.js}'],
        // synchronize: false,
        synchronize: true,
      }),
    }),
    UsersModule,
    TweetsModule,
    MediaModule,
    CommentsModule,
    LikesModule,
    BluetickModule,
    UsersModule
  ],
  controllers: [],
  providers:[AppService]

})
export class AppModule { }
