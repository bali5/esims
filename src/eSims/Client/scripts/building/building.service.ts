import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import './../common/rxjs-extensions';

@Injectable()
export class BuildingService {
  constructor(private http: Http) { }

}