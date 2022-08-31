// import { EntityRepository } from "typeorm";

import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
// @EntityRepository(User)
// export class UsersRepository extends Repository<User>{

// }

@Injectable()
export class UsersRepository {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async createUser(authCredentialDto:AuthCredentialsDto):Promise<void>{
    const{ username,password } = authCredentialDto;

    // hash password bcrypt
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password,salt);

    const user = this.userRepository.create({ username,password: hashedPassword});

    try{
      await this.userRepository.save(user);
    }catch (error){
      if (error.code === '23505'){
        throw new ConflictException('Username already exists')
      }else{
        throw new InternalServerErrorException();
      }
    }
  }
}

