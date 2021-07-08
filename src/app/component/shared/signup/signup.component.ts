import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private UserService: UserAuthService,
    private router: Router,
    private toastr: ToastrService) { }

  saveFormData(signupForm:NgForm) {
    this.UserService.registerUser(signupForm.value).subscribe(data => {
      if(signupForm.invalid){
        return;
      }
      this.toastr.success('Register success!');
      this.router.navigate(['/login'])
    }, error => {
      this.errorMessage = (error.error)
      this.toastr.error(this.errorMessage);
    }
    )
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required),
      'role': new FormControl('',Validators.required),
    })
  }


}
