// src/modules/article/dto/id.dto.ts
import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';
import { ApiProperty } from '@nestjs/swagger';
export class IdDTO {
  @ApiProperty({
    // 为swagger配置接口说明
    description: '文章id',
    example: 1,
  })
  @Matches(regPositive, { message: '请输入有效id' })
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number;
}
