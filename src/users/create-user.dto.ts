import { Movie } from './../movies/movies.entity'

export class CreateUserDto {
	id: number;
	firstName: string;
	lastName: string;
	movies: Movie[];
}

export class UpdateUserDto {
	id?: number;
	firstName?: string;
	lastName?: string;
	movies?: Movie[];
}