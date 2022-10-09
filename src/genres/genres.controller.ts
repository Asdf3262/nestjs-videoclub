import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './genres.dto';
import { UpdateGenreDto } from './genres.dto';

@Controller()
export class GenresController {
    constructor(private readonly genreService: GenresService) { }

    @Post('/genres')
    createMovie(@Body() createGenreDto: CreateGenreDto) {
        this.genreService.createGenre(createGenreDto);
    }

    @Get('/genres')
    getGenres(@Query('id') id: number) {
        return id ? this.genreService.findOne(id) : this.genreService.getGenres();
    }

    @Put('/genres/:id')
    editGenre(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
        this.genreService.editGenre(id, updateGenreDto);
    }

    @Delete("/genres/:id")
    deleteGenre(@Param('id') id: number) {
        this.genreService.remove(id);
    }
}