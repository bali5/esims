import { Injectable } from '@angular/core';

@Injectable()
export class BuildingConfig {
  public floorColors: string[] = [
    //'#FFFF00',
    //'#FFBF00',
    //'#FF8000',
    //'#FF4000',
    //'#FF0000',
    //'#BF4000',
    //'#808000',
    //'#40BF00',
    //'#00FF00',
    //'#00BF40',
    //'#008080',
    //'#0040BF',
    //'#0000FF',
    //'#4000FF',
    //'#8000FF',
    //'#BF00FF',
    //'#FF00FF',
    //'#BF40FF',
    //'#8080FF',
    //'#40BFFF',
    //'#00FFFF',
    "#660066",
    "#1900E6",
    "#006600",
    "#FFFF00",
    "#FF6600",
    "#CC0000",
    "#993300",
  ];

  public maxFloorSize: number = 16;

  public validColor: string = 'green';
  public invalidColor: string = 'red';
  public activeColor: string = 'deepskyblue';

}