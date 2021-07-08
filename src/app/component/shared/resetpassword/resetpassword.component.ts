import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../../services/reset-password.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  errorMsg:string;

  constructor(
    private ResetpasswordService: ResetPasswordService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      "email": new FormControl('', Validators.required)
    })

  }

  checkEmail(FormData:FormData) {
    const email = this.resetForm.controls.email.value
    this.ResetpasswordService.isemailfounded(email).subscribe(result=>{
      if(result){
        console.log(result)
      }else{
        this.ResetpasswordService.isMatched = false;

      }
    },
    error => {
      this.errorMsg = error.error.text
      this.toastr.error(this.errorMsg);

    })


  }
}
