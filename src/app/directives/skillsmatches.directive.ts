import { Skills } from './../interfaces/skills';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function skillsMatchesDirective(list: Skills[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value.toLowerCase();
    return list.findIndex(item => item.name.toLowerCase() === val) === -1 ? {forbiddenName: { value: control.value }} : null;
    //return null;
  }

}
