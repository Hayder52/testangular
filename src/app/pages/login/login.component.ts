import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthguardServiceService } from 'src/app/authguard-service.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AuthguardServiceService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (window.localStorage.getItem('user') !== null) {
      this.router.navigate(['home']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // LOGIN HERE

    this.authServ
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .subscribe(
        (data: any) => {
          if (data.code == 200) {
            window.localStorage.setItem('user', JSON.stringify(data.data));
            this.router.navigate(['home']);
          } else {
            alert(data.message);
            this.submitted = false;
            this.loading = false;
          }
        },
        (err) => {
          console.error(err);
          this.submitted = false;
          this.loading = false;
        }
      );
  }
}
