import { Genre } from './../genres/genres.entity'

export class CreateMovieDto {
	id: number;
	title: string;
	description: string;
	director: string;
	year: number;
	genres: Genre[];
}

export class UpdateMovieDto {
	id?: number;
	title?: string;
	description?: string;
	director?: string;
	year?: number;
	genres?: Genre[];
}