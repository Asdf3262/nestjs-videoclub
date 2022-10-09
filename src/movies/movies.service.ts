import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './movies.dto';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private MoviesRepository: Repository<Movie>,
    ) { }
    async getMovies(): Promise<string> {
        //return await this.MoviesRepository.find();
        const movies = await this.MoviesRepository.find({
            relations: ["genres"]
        });
        let res: string = ``;
        movies.forEach(movie => {
            res += `<head><style>.movie p {padding-left:15px;} ul { padding: 0;} ul li { display: inline;list-style:none;
                      border: 1px solid #C9AB27;
                      border-radius: 15px;
                      padding: 5px;
                      color: white;
                      background-color: #C9AB27;
                      margin-left: 10px;}</style></head>
                <div class="movie"><h2>${movie.title}</h2>
                <p> Description: ${movie.description}</p>
                <p>Directed by: ${movie.director}</p>
                <p>Year: ${movie.year}</p></div>
                <ul>`;
            movie.genres.forEach(genre => {
                res += `<li>${genre.title}</li>`
            });
            res += `</ul>`
        });
        return res;
    }

    findOne(id): Promise<Movie> {
        return this.MoviesRepository.findOne({ where: { id : id } });
    }

    async createMovie(Movie: Movie) {
        this.MoviesRepository.save(Movie);
    }

    async remove(id): Promise<void> {
        await this.MoviesRepository.delete(id);
    }

    async editMovie(id, Movie: UpdateMovieDto): Promise<Movie> {
        const editedMovie = await this.MoviesRepository.findOne({ where: { id: id } });
        if (!editedMovie) {
            throw new NotFoundException('Movie not found');
        }
        editedMovie.title = Movie.title;
        editedMovie.description = Movie.description;
        editedMovie.director = Movie.director;
        editedMovie.year = Movie.year;
        editedMovie.genres = Movie.genres;
        await this.MoviesRepository.save(editedMovie);
        return editedMovie;
    }
}