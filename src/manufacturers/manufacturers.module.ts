import { Module } from '@nestjs/common';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Manufacturer } from './manufacturers.model';

@Module({
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
  imports: [SequelizeModule.forFeature([Manufacturer])]
})
export class ManufacturersModule {}
