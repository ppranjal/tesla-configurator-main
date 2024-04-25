import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarService } from '../car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  configStep: boolean = true;
  summaryStep: boolean = true;
  private tabEnableSubscription!: Subscription;
  private tabDisableSubscription!: Subscription;


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.tabEnableSubscription = this.carService.getTabEnable().subscribe(res => {
      this.configStep = res;
    })
    this.tabDisableSubscription = this.carService.getTabDisable().subscribe(res => {
      this.summaryStep = res;
    })
  }

  ngOnDestroy(): void {
    this.tabEnableSubscription?.unsubscribe();
    this.tabDisableSubscription?.unsubscribe();
  }
}
