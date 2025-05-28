import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Goods } from './goods.model';
import { UpdatePriceDto } from './dto/update-price.dto';
import { SellGoodsDto } from './dto/sell-goods.dto';
import { FindGoodsDto } from './dto/find-goods.dt';

@ApiTags('Строительный товары')
@Controller('goods')
export class GoodsController {
    constructor(private goodsService: GoodsService) {}

    @ApiOperation({summary: 'Получить все товары'})
    @ApiResponse({status: 200, type: [Goods]})
    @Get()
    getAll() {
        return this.goodsService.getAllGoods();
    }

    @ApiOperation({summary: 'Создать товар'})
    @ApiResponse({status: 200, type: Goods})
    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    createGoods(@Body() dto: CreateGoodsDto,
                @UploadedFile() photo) {
        return this.goodsService.createGoods(dto, photo);
    }

    @ApiOperation({summary: 'Обновить цену'})
    @ApiResponse({status: 200, type: Goods})
    @Post('/update_price')
    updatePrice(@Body() dto: UpdatePriceDto) {
        return this.goodsService.updatePrice(dto);
    }

    @ApiOperation({summary: 'Продать товар'})
    @ApiResponse({status: 200, type: Goods})
    @Post('/sell')
    sellGoods(@Body() dto: SellGoodsDto) {
        return this.goodsService.sellGoods(dto);
    }

    @ApiOperation({summary: 'Найти товар по артикулу'})
    @ApiResponse({status: 200, type: Goods})
    @Post('/find')
    findByArt(@Body() dto: FindGoodsDto) {
        return this.goodsService.findByArt(dto);
    }
}
