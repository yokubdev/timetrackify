import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './crate-role.dto';
import { Role } from './roles.model';
import { where } from 'sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRolesByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
