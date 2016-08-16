import 'reflect-metadata';
//import * as _ from 'lodash';

export function Inherit(annotation?: any) {
  return function (target: Function) {
    var _ = window['_'];

    function meta(name, p, t) {
      var pmeta = Reflect.getMetadata(name, p);
      var tmeta = Reflect.getMetadata(name, t);
      Reflect.defineMetadata(name, _.merge({}, pmeta, tmeta), target);
    }

    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;

    //meta('annotations', parentTarget, target);
    //meta('design:paramtypes', parentTarget, target);
    meta('propMetadata', parentTarget, target);
    //meta('parameters', parentTarget, target);
  }
}