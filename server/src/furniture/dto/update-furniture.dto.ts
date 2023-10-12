import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnitureDto } from './create-furniture.dto';

export class UpdateFurnitureDto extends PartialType(CreateFurnitureDto) {}
