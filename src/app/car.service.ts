import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarColors, CarConfig, CarModels } from './car-model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  selectedModel!: string;
  configData!: CarConfig;
  imgUrl!: string;
  colorInfo!: CarColors;
  hitch!: boolean;
  yoke!: boolean;
  private _enableTab = new BehaviorSubject<boolean>(true);
  private _disableTab = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  getCarModels() {
    return this.http.get<CarModels[]>('/models');
  }

  getCarConfig(mode: string) {
    return this.http.get<CarConfig[]>(`/options/${mode}`);
  }

  setSelectedModel(model) {
    this.selectedModel = model;
  }

  getSelectedModel() {
    return this.selectedModel;
  }

  setConfigData(data) {
    this.configData = data;
  }

  getConfigData() {
    return this.configData;
  }

  setSelectedImg(imgUrl) {
    this.imgUrl = imgUrl;
  }

  getSelectedImg() {
    return this.imgUrl;
  }

  setTabEnable(value) {
    this._enableTab.next(value);
  }

  getTabEnable(): Observable<boolean> {
    return this._enableTab.asObservable();
  }

  setModelColorInfo(info) {
    this.colorInfo = info;
  }

  getModelColorInfo() {
    return this.colorInfo;
  }

  setHitchValue(value){
   this.hitch = value;
  }

  getHitchValue(){
    return this.hitch;
  }

  setYokeValue(value){
    this.yoke = value;
   }
  getYokeValue(){
    return this.yoke;
  }

  setTabDisable(value){
   this._disableTab.next(value);
  }
  
  getTabDisable(): Observable<boolean>{
  return this._disableTab.asObservable();
  }
}
