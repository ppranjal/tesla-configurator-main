import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { StepComponent } from './step/step.component';
import { CarService } from './car.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, StepComponent,HttpClientModule],
  providers: [CarService],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'Angular';

}
