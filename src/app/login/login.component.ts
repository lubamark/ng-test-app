import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {CustomValidators} from '../common/custom-validators';
import {UsersService} from '../common/users.service';
import {User} from '../common/users.model';
import {Message} from '../common/message.model';
import {AuthService} from '../common/auth.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValidators = [
    Validators.required,
    Validators.minLength(6)
  ];
  passwordValidators = [
    Validators.required,
    Validators.minLength(5),
    CustomValidators.hasLatinUpper,
    CustomValidators.hasLatinLower,
    CustomValidators.hasNumber,
    CustomValidators.hasPoint
  ];
  form: FormGroup;

  isPasswordVisible = false;
  isSubmitted = false;
  instructions = {
    login: ['не менее 6 символов'],
    password: [
      'латинскую букву в верхнем регистре',
      'латинскую букву в нижнем регистре',
      'цифру',
      'знак препинания',
      'не менее 5 символов'
    ]};
  message: Message;


  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.accessDenied) {
          this.showMessage({
              text: 'Для просмотра страницы нужно войти',
              type: 'warning'
            });
        }
      });

    this.form = new FormGroup({
      login: new FormControl('', this.loginValidators),
      password: new FormControl('', this.passwordValidators)
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  symbolsLasted(num) {
    let str = '';
    if (num === 1) {
      str = 'символ';
    } else if (num > 1 && num < 5) {
      str = 'символа';
    } else {
      str = 'символов';
    }
    return num + ' ' + str;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const formData = this.form.value;
      this.usersService.getUserbyLogin(formData.login)
        .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/logout']);
          } else {
            this.showMessage({
              text: 'Пароль не верный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользователя не существует',
            type: 'danger'
          });
        }
      });
    }

  }

}
