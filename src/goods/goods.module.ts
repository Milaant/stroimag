import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [
    SequelizeModule.forFeature([Goods]),
    FilesModule
  ]
})
export class GoodsModule {}
