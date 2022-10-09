import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './movies.dto';
import { UpdateMovieDto } from './movies.dto';

@Controller()
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    @Post('/movies')
    createMovie(@Body() createMovieDto: CreateMovieDto) {
        this.movieService.createMovie(createMovieDto);
    }

    @Get('/movies')
    getMovies(@Query('id') id: number) {
        return id ? this.movieService.findOne(id) : this.movieService.getMovies();
    }

    @Put('/movies/:id')
    editMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
        this.movieService.editMovie(id, updateMovieDto);
    }

    @Delete("/movies/:id")
    deleteMovie(@Param('id') id: number) {
        this.movieService.remove(id);
    }
}