import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  studentID: any;
  ScheduleDestination= "Spawn_Locker_Hangout_Seat_LunchSpot_Seat_Clean_Club_Locker_Exit";

  constructor(private Router: Router,
    private UserAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.studentID = this.UserAuthService.userID()
    // localStorage.setItem("StudentID", this.studentID)
    // this.studentID = localStorage.getItem("StudentID")
  }

}
