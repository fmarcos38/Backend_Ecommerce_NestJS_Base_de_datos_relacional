import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BrandsService } from 'src/Products/Services/brands/brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    
}
