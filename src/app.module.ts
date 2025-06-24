import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { TwitterService } from './twitter/twitter.service';
import { TwitterModule } from './twitter/twitter.module';
import { Media } from './twitter/entity/media.entity';
import { Tweet } from './twitter/entity/tweeets.entity';
import { TUser } from './twitter/entity/tuser.entity';


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
        entities: [User,Media,Tweet,TUser],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],

        // synchronize: false,
        synchronize: true,
      }),
    }),
    UserModule,
    TwitterModule,
  ],
  controllers: [],

})
export class AppModule { }
