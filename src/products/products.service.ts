import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = new Product();
      Object.assign(product, createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error creating the product');
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async findOne(id: number) {
    try {
      const found = await this.productRepository.findOneBy({ id: id });
      if (!found) {
        throw new NotFoundException(`product #${id} not found`);
      }
      return found;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching the product');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productToUpdate = await this.findOne(id);
      const updatedProduct = this.productRepository.merge(
        productToUpdate,
        updateProductDto,
      );
      await this.productRepository.save(updatedProduct);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating the product');
    }
  }

  async remove(id: number) {
    try {
      const productToRemove = await this.findOne(id);
      return await this.productRepository.remove(productToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error removing the product');
    }
  }
}
