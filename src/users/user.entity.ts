import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Movie } from './../movies/movies.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@ManyToMany(type => Movie, { cascade: false })
	@JoinTable({
		name: 'users_movies',
		joinColumn: { name: 'user_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' }
	})
	movies: Movie[];
}