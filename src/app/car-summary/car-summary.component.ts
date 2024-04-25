import { Component } from '@angular/core';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-summary.component.html',
  styleUrl: './car-summary.component.scss'
})
export class CarSummaryComponent {

  model!: string;
  colorInfo;
  imgUrl!: string
  description!: string;
  price!: number;
  speed!: number;
  range!: number;
  towHitch!: boolean;
  yoke!: boolean;
  colorName!: string;
  colorPrice: number = 0;
  towHitchPrice: number = 0;
  yokePrice: number = 0;
  total: number = 0;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.model = this.carService.getSelectedModel()['model'];
    this.colorInfo = this.carService.getModelColorInfo();
    this.imgUrl = this.carService.getSelectedImg();
    this.towHitch = this.carService.getHitchValue();
    this.yoke = this.carService.getYokeValue();
    this.description = this.carService.getConfigData()['description'];
    this.range = parseInt(this.carService.getConfigData()['range']);
    this.speed = parseInt(this.carService.getConfigData()['speed']);
    this.price = parseInt(this.carService.getConfigData()['price']);
    this.calculateTotal(this.colorInfo,this.price);
  }

  calculateTotal(colorInfo,price){
    if(colorInfo.price){
      this.colorPrice = colorInfo.price;
      this.colorName = colorInfo.description;
    }
    if(this.towHitch){
      this.towHitchPrice = 1000;
    }
    if(this.yoke){
      this.yokePrice = 1000;
    }

    this.total = price + this.colorPrice + this.towHitchPrice + this.yokePrice;
  }

}
