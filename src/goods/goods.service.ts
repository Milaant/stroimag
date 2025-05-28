import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { FilesService } from 'src/files/files.service';
import { UpdatePriceDto } from './dto/update-price.dto';
import { SellGoodsDto } from './dto/sell-goods.dto';
import { FindGoodsDto } from './dto/find-goods.dt';

@Injectable()
export class GoodsService {
    constructor(@InjectModel(Goods) private goodsRepository: typeof Goods,
                private fileService: FilesService) {}

    async getAllGoods() {
        const goods = await this.goodsRepository.findAll();
        return goods;
    }

    async createGoods(dto: CreateGoodsDto, photo) {
        const fileName = await this.fileService.createFile(photo);
        const goods = await this.goodsRepository.create({...dto, photo: fileName});
        return goods;
    }

    async updatePrice(dto: UpdatePriceDto) {
        const goods = await this.goodsRepository.findByPk(dto.id);
        goods.price = dto.price;
        await goods.save();
        return goods;
    }

    async sellGoods(dto: SellGoodsDto) {
        const goods = await this.goodsRepository.findByPk(dto.id);
        if (dto.ammount > goods.ammount) {
            throw new HttpException('На складе недостаточно товара для продажи', HttpStatus.BAD_REQUEST);
        }

        if (dto.ammount * goods.price < dto.money) {
            throw new HttpException('Недостаточно денег для покупки товара', HttpStatus.BAD_REQUEST);
        }

        goods.ammount = goods.ammount - dto.ammount;
        await goods.save();

        return goods;
    }

    async findByArt(dto: FindGoodsDto) {
        const goods = await this.goodsRepository.findOne({where: {art: dto.art}});
        if (goods) {
            return goods;
        }

        throw new HttpException('Товар с таким артикулом не найден', HttpStatus.NOT_FOUND);
    }
}
