import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Manufacturer } from "src/manufacturers/manufacturers.model";

interface GoodsCreationAttrs {
    name: string;
    art: number;
    manufacturer: number;
    price: number;
    unit: string;
    weight: number;
    ammount: number;
    photo: string;
}

@Table({tableName: 'goods'})
export class Goods extends Model<Goods, GoodsCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '123456', description: 'Артикул товара'})
    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    art: number;

    @ApiProperty({example: 'Цемент', description: 'Наименование товара'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '1', description: 'Производитель'})
    @ForeignKey(() => Manufacturer)
    @Column({type: DataType.INTEGER, allowNull: false})
    manufacturer: number;

    @ApiProperty({example: '100.00', description: 'Цена за единицу'})
    @Column({type: DataType.FLOAT, allowNull: false})
    price: number;

    @ApiProperty({example: 'шт', description: 'Единица измерения'})
    @Column({type: DataType.STRING, allowNull: false})
    unit: string;
    
    @ApiProperty({example: '10.00', description: 'Вес единицы товара, кг'})
    @Column({type: DataType.FLOAT, allowNull: false})
    weight: number;

    @ApiProperty({example: '38', description: 'Доступное количество единиц товара'})
    @Column({type: DataType.FLOAT, allowNull: false})
    ammount: number;

    @ApiProperty({example: 'photo.jpg', description: 'Фотография товара'})
    @Column({type: DataType.STRING})
    photo: string;
}
