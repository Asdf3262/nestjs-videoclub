import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { Movie } from './movies/movies.entity';
import { Genre } from './genres/genres.entity';
import { UsersModule } from './users/user.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'nest',
            entities: [User, Movie, Genre],
            synchronize: true,
        }),
        UsersModule,
        MoviesModule,
        GenresModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }