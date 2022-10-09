import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private UsersRepository: Repository<User>,
    ) { }
    async getUsers(): Promise<User[]> {
        return await this.UsersRepository.find();
    }

    findOne(id): Promise<User> {
        return this.UsersRepository.findOne({ where: { id : id } });
    }

    async getUsersMovies(): Promise<string> {
        //return await this.MoviesRepository.find();
        const usersMovies = await this.UsersRepository.find({
            relations: ["movies"]
        });
        let res: string = ``;
        usersMovies.forEach(userMovies => {
            res += `<head><style>.movie p {padding-left:15px;} ul { padding: 0;} ul li { display: inline;list-style:none;
                      border: 1px solid #E8E5D8;
                      border-radius: 15px;
                      padding: 5px;
                      background-color: #E8E5D8;
                      margin-left: 10px;}</style></head>
                <div class="movie"><h2>${userMovies.firstName} ${userMovies.lastName}</h2>
                <ul>`;
            userMovies.movies.forEach(movie => {
                res += `<li onclick="console.log('ASDF')">${movie.title}</li>`
            });
            res += `</ul>`
        });
        return res;
    }

    async createUser(User: User) {
        this.UsersRepository.save(User);
    }

    async remove(id): Promise<void> {
        await this.UsersRepository.delete(id);
    }

    async editUser(id, User: UpdateUserDto): Promise<User> {
        const editedUser = await this.UsersRepository.findOne({ where: { id: id } });
        if (!editedUser) {
            throw new NotFoundException('User is not found');
        }
        editedUser.firstName = User.firstName;
        editedUser.lastName = User.lastName;
        editedUser.movies = User.movies;
        await this.UsersRepository.save(editedUser);
        return editedUser;
    }
}