import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Positions } from "../interfaces/positions";

export function categoriesMatchesDirective(list: Positions[]): ValidatorFn  {

  return (control: AbstractControl): ValidationErrors | null => {

    const val = control.value.toLowerCase();
    return list.findIndex(item => item.name.toLowerCase().includes(val)) === -1 ? {forbiddenName: { value: control.value }} : null;
  }

}
