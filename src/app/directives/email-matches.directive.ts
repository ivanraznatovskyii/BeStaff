import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Positions } from "../interfaces/positions";

export function emailsMatchesDirective(): ValidatorFn  {

  const invalidEmailsList = [
    'gmail.com',
    'yandex.ru',
    'mail.com',
    'rambler.ru'
  ];

  return (control: AbstractControl): ValidationErrors | null => {

    const val = control.value.toLowerCase().replace(/(\W|^)[\w.\-]{0,25}@/, '');
    //return null;
    return invalidEmailsList.findIndex(item => item.toLowerCase() === val.toLowerCase()) !== -1 ? {forbiddenName: { value: control.value }} : null;
  }

}
