import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcryptjs';
import { AddUserRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async addUserRole(dto: AddUserRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', 404);
  }
  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
