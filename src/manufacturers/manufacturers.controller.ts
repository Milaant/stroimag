import { Body, Controller, Get, Post } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Controller('manufacturers')
export class ManufacturersController {
    constructor(private manufacturerService: ManufacturersService) {}

    @ApiOperation({summary: 'Список производителей'})
    @Get()
    async getAllManufacturers() {
        const manufacturer = this.manufacturerService.getAllManufacturers();
        return manufacturer;
    }

    @ApiOperation({summary: 'Создать производителя'})
    @Post()
    async createManufacturer(@Body() dto: CreateManufacturerDto) {
        const manufacturer = await this.manufacturerService.createManufacturer(dto);
        return manufacturer;
    }
}
