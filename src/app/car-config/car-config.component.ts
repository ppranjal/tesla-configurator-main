import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { HttpClientModule } from '@angular/common/http';
import { CarConfig, config } from '../car-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './car-config.component.html',
  styleUrl: './car-config.component.scss'
})
export class CarConfigComponent {

  public form!: FormGroup;
  public carConfigs!: CarConfig[];
  public range!: number;
  public speed!: number;
  public price!: number;
  public yoke: boolean = false;
  public toHitch: boolean = false;
  public imgUrl!: string;
  private configSubscription!: Subscription;

  constructor(private fb: FormBuilder,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      carConfig: ['1'],
      towHitch: [],
      yoke: []
    });

    this.imgUrl = this.carService.getSelectedImg();
    const selectedCode = this.carService.getSelectedModel();
    this.setInitialValue();
    this.configSubscription = this.carService.getCarConfig(selectedCode['code']).subscribe((res) => {
      this.carConfigs = res['configs'];
      this.carService.setTabDisable(false);
      this.price = this.carConfigs[0]['price'];
      this.speed = this.carConfigs[0]['speed'];
      this.range = this.carConfigs[0]['range'];
      if (res['towHitch']) {
        this.toHitch = true;
      }
      if (res['yoke']) {
        this.yoke = true;
      }
      this.carService.setConfigData(this.carConfigs[0])
    })
  }


  changeConfig(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const filteredValue = this.carConfigs?.filter(model => model['id'].toString() == value)[0];
    this.price = filteredValue['price'];
    this.speed = filteredValue['speed'];
    this.range = filteredValue['range'];
    this.carService.setConfigData(filteredValue)

  }

  checkHitchValue(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.carService.setHitchValue(value);
  }

  checkYokeValue(event) {
    const value = (event.target as HTMLInputElement).checked;
    this.carService.setYokeValue(value);
  }

  setInitialValue(){
    this.carService.setHitchValue(false);
    this.carService.setYokeValue(false);
  }

  ngOnDestroy(): void {
    this.configSubscription?.unsubscribe();
  }

}
