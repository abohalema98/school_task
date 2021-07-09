import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ResetPasswordService } from '../../../../services/reset-password.service'

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  cofirmpasswordForm: FormGroup;
  compare: boolean = false;
  errorMsg: string

  get confirmpass() {
    return this.confirmpass.get('confirmpass')
  }
  get newpassword() {
    return this.confirmpass.get('newpassword')
  }

  constructor(private router: Router,
    private toastr: ToastrService,
    private ResetpasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.cofirmpasswordForm = new FormGroup({
      "newpassword": new FormControl('', Validators.required),
      "confirmpass": new FormControl('', Validators.required),
      "verificationCode": new FormControl('', Validators.required),

    })
  }
  changePass(data: FormData) {

    const newPassword = this.cofirmpasswordForm.controls.newpassword.value
    const verificationCode = this.cofirmpasswordForm.controls.verificationCode.value
    this.ResetpasswordService.confirmPassword(newPassword, verificationCode).subscribe((result) => {
      if (result) {
        this.toastr.success('Password Changed');
        this.router.navigate(['/login'])
        // console.log(result)
      }
    },
      error => {
        // console.log(error.error.text)
        this.errorMsg = error.error.text
        this.toastr.error(this.errorMsg);

      })
  }


}
