import { Routes } from '@angular/router';
import { CarInfoComponent } from './car-info/car-info.component';
import { CarConfigComponent } from './car-config/car-config.component';
import { CarSummaryComponent } from './car-summary/car-summary.component';

export const routes: Routes = [
    { path: 'car-info', component: CarInfoComponent },
    { path: 'car-config', component: CarConfigComponent },
    { path: 'car-summary', component: CarSummaryComponent },
    { path: '', redirectTo: '/car-info',pathMatch: 'full' }
];
