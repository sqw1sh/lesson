import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormValidatorsService {
  constructor() {}

  public onlyWord(control: AbstractControl): ValidationErrors | null {
    const result = /^[а-яёА-ЯЁ]+$/.test(control.value);
    return !result ? { onlyWord: { value: control.value } } : null;
  }

  public phoneNumber(control: AbstractControl): ValidationErrors | null {
    const result = /^\+{0,1}[0-9]{11}$/.test(control.value);
    return !result ? { phoneNumber: { value: control.value } } : null;
  }

  public address(control: AbstractControl): ValidationErrors | null {
    const result = /^([а-яёА-ЯЁ0-9 \\\-\,\.])*$/.test(control.value);
    return !result ? { address: { value: control.value } } : null;
  }
}
