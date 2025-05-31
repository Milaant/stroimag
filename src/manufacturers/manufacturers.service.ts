import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Manufacturer } from './manufacturers.model';

@Injectable()
export class ManufacturersService {
    constructor(@InjectModel(Manufacturer) private manufacturerRepository: typeof Manufacturer) {}

    async getAllManufacturers() {
        const manufacturers = this.manufacturerRepository.findAll({include: {all: true}});
        return manufacturers;
    }

    async createManufacturer(dto: CreateManufacturerDto) {
        const manufacturer = this.manufacturerRepository.create(dto);
        return manufacturer;
    }
}
