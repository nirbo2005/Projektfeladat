import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, Min, Max, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'A termék neve' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'A termék ára' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Raktárkészlet' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'A termék színe' })
  @IsString()
  color: string;

  @ApiProperty({ description: 'Értékelés 0-10 között', default: 0 })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number;

  @ApiProperty({ description: 'Kiadás éve' })
  @IsNumber()
  releaseYear: number;

  @ApiProperty({ description: 'Publikálva van-e', default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
