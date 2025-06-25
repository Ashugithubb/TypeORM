import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './practice/user/user.module';
import { TwitterService } from './twitter/twitter.service';
import { TwitterModule } from './twitter/twitter.module';
import { Media } from './twitter/entity/media.entity';
import { Tweet } from './twitter/entity/tweeets.entity';
import { User } from './twitter/entity/user.entity';
import { UsersModule } from './twitter/users/users.module';
import { TweetsModule } from './twitter/tweets/tweets.module';
import { MediaModule } from './twitter/media/media.module';
import { CommentsModule } from './twitter/comments/comments.module';
import { LikesModule } from './twitter/likes/likes.module';


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
        entities: [User,Media,Tweet],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],

        // synchronize: false,
        synchronize: true,
      }),
    }),
    UserModule,
    TwitterModule,
    UsersModule,
    TweetsModule,
    MediaModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [],

})
export class AppModule { }
