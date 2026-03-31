import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        price: number;
        stock: number;
        color: string;
        rating: number;
        releaseYear: number;
        published: boolean;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        price: number;
        stock: number;
        color: string;
        rating: number;
        releaseYear: number;
        published: boolean;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        price: number;
        stock: number;
        color: string;
        rating: number;
        releaseYear: number;
        published: boolean;
        id: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        price: number;
        stock: number;
        color: string;
        rating: number;
        releaseYear: number;
        published: boolean;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        price: number;
        stock: number;
        color: string;
        rating: number;
        releaseYear: number;
        published: boolean;
        id: number;
    }>;
}
