import "reflect-metadata";
import {
  DirectiveMetadata,
} from '@angular/core';
import { isPresent } from '@angular/common/src/facade/lang';

export function ExtendedDirective(annotation: any) {
  return function (target: Function) {
    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
    if (parentAnnotations) {
      var parentAnnotation = parentAnnotations[0];
      Object.keys(parentAnnotation).forEach(key => {
        if (isPresent(parentAnnotation[key])) {
          annotation[key] = parentAnnotation[key];
        }
      });
    }

    var metadata = new DirectiveMetadata(annotation);

    Reflect.defineMetadata('annotations', [metadata], target);
    Reflect.defineMetadata('propMetadata', [Reflect.getMetadata('propMetadata', parentTarget)], target);
  }
}
