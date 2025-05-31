import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Goods } from "src/goods/goods.model";

interface ManufacturerCreationAttrs {
    name: string;
    art: number;
    manufacturer: string;
    price: number;
    unit: string;
    weight: number;
    ammount: number;
    photo: string;
}

@Table({tableName: 'manufacturers'})
export class Manufacturer extends Model<Manufacturer, ManufacturerCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ООО "Цементзавод"', description: 'Название производителя'})
    @Column({type: DataType.STRING, allowNull:false})
    name: string;

    @ApiProperty({example: '1234567890', description: 'ИНН производителя'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    inn: string;

    @ApiProperty({example: 'Цементград, Цементная ул, 32', description: 'Адрес завода'})
    @Column({type: DataType.STRING, allowNull:false})
    address: string;

    @HasMany(() => Goods)
    goods: Goods[];
}
