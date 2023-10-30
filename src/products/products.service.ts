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
    Object.assign(product, createProductDto);

    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const found = await this.productRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`product #${id} not found`);
    }

    return found;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.findOne(id); // Récupération d'un produit par son id
    const updatedProduct = this.productRepository.merge(
      productToUpdate,
      updateProductDto,
    ); // Fusion des données du produit à mettre à jour avec les nouvelles données
    await this.productRepository.save(updatedProduct); // Sauvegarde du produit mis à jour
  }

  async remove(id: number) {
    const productToRemove = await this.findOne(id);
    if (!productToRemove) {
      throw new NotFoundException(`product #${id} not found`);
    }
    return this.productRepository.remove(productToRemove);
  }
}
