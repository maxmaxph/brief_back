import { Injectable, NotFoundException } from '@nestjs/common';
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
    const product = new Product();
    Object.assign(createProductDto, product);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find;
  }

  async findOne(id: number) {
    const found = await this.productRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`product #${id} not found`);
    }

    return found;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log('Je suis dans le productService et je Logg', UpdateProductDto);
    const productToUpdate = await this.findOne(id);
    Object.assign(productToUpdate, updateProductDto);
    return this.productRepository.save(productToUpdate);
  }

  async remove(id: number) {
    const productToRemove = await this.findOne(id);
    if (!productToRemove) {
      throw new NotFoundException(`product #${id} not found`);
    }
    return this.productRepository.remove(productToRemove);
  }
}
