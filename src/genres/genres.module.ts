import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './genres.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    providers: [GenresService],
    controllers: [GenresController],
})
export class GenresModule { }