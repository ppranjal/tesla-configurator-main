import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { HttpClientModule } from '@angular/common/http';
import { CarColors, CarModels } from '../car-model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './car-info.component.html',
  styleUrl: './car-info.component.scss'
})
export class CarInfoComponent {

  public form!: FormGroup;
  public carModel: CarModels[] | undefined;
  public carColor!: CarColors[];
  public selectedModel!: string;
  public selectedColor!: string;
  public showColorDrpDwn: boolean = false;
  public imageUrl!: string;
  private modelSubscription!: Subscription;

  constructor(private carService: CarService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      carModel: [],
      modelColor: []
    });

   this.modelSubscription = this.carService.getCarModels().subscribe(res => {
      this.carModel = res;
      this.carColor = this.carModel.filter(model => model.code == 'S')[0].colors;
    })

  }

  changeModel(event: Event) {
    this.imageUrl = '';
    const value = (event.target as HTMLInputElement).value;
    this.selectedModel = value;
    this.carService.setSelectedModel({model:this.carModel!.filter(x => x.code == value)[0].description, code:this.selectedModel});
    this.showColorDrpDwn = true;
    this.carService.setTabEnable(false);
    this.carColor = this.carModel!.filter(x => x.code == value)[0].colors;
    this.carService.setModelColorInfo(this.carColor[0]);
    this.form.get('modelColor')!.setValue(this.carColor[0].code);
    this.selectedColor = this.form.get('modelColor')!.value;
    this.constructUrl(this.selectedModel, this.selectedColor);
  }

  changeColor(event: Event) {
    this.imageUrl = '';
    const value = (event.target as HTMLInputElement).value;
    this.selectedColor = value;
    this.carService.setModelColorInfo(this.carColor.filter(x => x.code == value)[0])
    this.constructUrl(this.selectedModel, this.selectedColor)
  }

  constructUrl(selectedModel: string, selectedColor: string) {
    this.imageUrl = `https://interstate21.com/tesla-app/images/${selectedModel}/${selectedColor}.jpg`;
    this.carService.setSelectedImg(this.imageUrl);
  }

 ngOnDestroy(): void {
    this.modelSubscription?.unsubscribe();
  }

}
