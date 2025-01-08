import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from "./product.model";

@Controller('products')
export class AppController {
    constructor(private readonly appService: AppService) {}

    // Method to handle GET requests to fetch a list of products
    @Get()
    async findAll(
        @Query('page') page: number = 1,  // Default page number is 1 if not provided
        @Query('pageSize') pageSize: number = 10, // Default page size is 10 if not provided
        @Query('search') search: string = '',  // Search term for filtering products
        @Query('id') id: number = null  // Optional ID parameter for filtering by product ID
    ): Promise<{ products: Product[], totalCount: number }> {
        // Convert page and pageSize parameters to integers
        const pageNumber = parseInt(String(page), 10);
        const pageSizeNumber = parseInt(String(pageSize), 10);

        console.log(pageNumber); // For debugging
        console.log(pageSizeNumber); // For debugging

        // If pageNumber or pageSize is invalid, fall back to default values
        if (isNaN(pageNumber) || pageNumber <= 0) {
            return this.appService.findAll(1, pageSizeNumber, search, id); // Default page 1
        }
        if (isNaN(pageSizeNumber) || pageSizeNumber <= 0) {
            return this.appService.findAll(pageNumber, 10, search, id); // Default page size 10
        }

        // Return products and total count from the service
        return this.appService.findAll(pageNumber, pageSizeNumber, search, id);
    }

    // Method to handle GET requests to fetch a single product by its ID
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Product> {
        return this.appService.findOne(id); // Fetch product by ID
    }

    // Method to handle POST requests for creating a new product
    @Post()
    create(@Body() product: Partial<Product>): Promise<Product> {
        return this.appService.create(product); // Create a new product
    }

    // Method to handle PUT requests for updating an existing product
    @Put(':id')
    update(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
        return this.appService.update(id, product); // Update product by ID
    }

    // Method to handle DELETE requests for deleting a product
    @Delete(':id')
    delete(@Param('id') id: number): Promise<{ success: boolean; message: string }> {
        return this.appService.delete(id); // Delete product by ID
    }
}
