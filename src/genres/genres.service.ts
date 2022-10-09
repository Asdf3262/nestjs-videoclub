import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGenreDto } from './genres.dto';
import { Genre } from './genres.entity';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre) private GenresRepository: Repository<Genre>,
    ) { }
    async getGenres(): Promise<Genre[]> {
        return await this.GenresRepository.find();
    }

    findOne(id): Promise<Genre> {
        return this.GenresRepository.findOne({ where: { id : id } });
    }

    async createGenre(Genre: Genre) {
        this.GenresRepository.save(Genre);
    }

    async remove(id): Promise<void> {
        await this.GenresRepository.delete(id);
    }

    async editGenre(id, Genre: UpdateGenreDto): Promise<Genre> {
        const editedGenre = await this.GenresRepository.findOne({ where: { id: id } });
        if (!editedGenre) {
            throw new NotFoundException('Genre not found');
        }
        editedGenre.title = Genre.title;
        await this.GenresRepository.save(editedGenre);
        return editedGenre;
    }
}