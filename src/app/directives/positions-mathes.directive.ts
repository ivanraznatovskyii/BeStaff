import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Positions } from "../interfaces/positions";

export function positionsMatchesDirective(list: Positions[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value.toLowerCase();
    return list.findIndex(item => item.name.toLowerCase() === val) === -1 ? {forbiddenName: { value: control.value }} : null;
    //return null;
  }

}

