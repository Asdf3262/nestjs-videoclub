import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Genre } from './../genres/genres.entity';

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	director: string;

	@Column()
	year: number;

	@ManyToMany(type => Genre, { cascade: false })
	@JoinTable({
		name: 'movies_genres',
		joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' }
	})
	genres: Genre[];
}