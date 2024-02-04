import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';

import { UserResponse } from '@users/responses/users.response';
import { CreateUserDTO, UpdateUserDTO } from '@users/dtos';
import { User } from '@users/interfaces/user.interface';
import { UsersService } from '@users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Busca por todos os usuários' })
    @ApiOkResponse({ description: 'OK', type: [UserResponse] })
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':userId')
    @ApiParam({
        name: 'userId',
        description: 'ID do usuário',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Busca pelo usuário com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: UserResponse })
    async getUserById(@Param('userId') userId: string): Promise<User> {
        return this.usersService.getUserById(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiCreatedResponse({ description: 'Created', type: UserResponse })
    async createUser(@Body() body: CreateUserDTO): Promise<User> {
        return this.usersService.createUser(body);
    }

    @Put(':userId')
    @ApiParam({
        name: 'userId',
        description: 'ID do usuário',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Atualiza o usuário com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: UserResponse })
    async updateUser(
        @Param('userId') userId: string,
        @Body() body: UpdateUserDTO,
    ): Promise<User> {
        return this.usersService.updateUser(userId, body);
    }

    @Delete(':userId')
    @ApiParam({
        name: 'userId',
        description: 'ID do usuário',
        example: '00000000-0000-0000-0000-000000000000',
    })
    @ApiOperation({ summary: 'Remove o usuário com o ID especificado' })
    @ApiOkResponse({ description: 'OK', type: UserResponse })
    async deleteUser(@Param('userId') userId: string): Promise<User> {
        return this.usersService.deleteUser(userId);
    }
}
