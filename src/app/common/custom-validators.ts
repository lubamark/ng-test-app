import {FormControl} from '@angular/forms';

export class CustomValidators {
  static hasLatinUpper = (control: FormControl) => {
    if (!/[A-Z]/.test(control.value)) {
      return {noLatinUpper: true};
    }
    return null;
  }
  static hasLatinLower = (control: FormControl) => {
    if (!/[a-z]/.test(control.value)) {
      return {noLatinLower: true};
    }
    return null;
  }
  static hasNumber = (control: FormControl) => {
    if (!/[0-9]/.test(control.value)) {
      return {noNumber: true};
    }
    return null;
  }
  static hasPoint = (control: FormControl) => {
    if (!/[,.!?;:()]/.test(control.value)) {
      return {noPoint: true};
    }
    return null;
  }
}
