import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 校验注册信息
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    const { mobile } = registerDTO;
    const hasUser = await this.userRepository.findOne({ where: { mobile } });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  async register(registerDto: RegisterDTO): Promise<any> {
    const { nickname, password, mobile } = registerDto;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: User = new User();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    return await this.userRepository.save(newUser);
  }

  // 登录校验
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile =:mobile', { mobile })
      .getOne();
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  // 生成 token
  async certificate(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    return {
      info: {
        token,
      },
    };
  }
}
