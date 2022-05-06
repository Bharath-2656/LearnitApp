import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/shared/services/Course/course.service';
import { UserService } from 'src/app/shared/services/User/user.service';

@Component({
  selector: 'app-instructor-register',
  templateUrl: './instructor-register.component.html',
  styleUrls: ['./instructor-register.component.css']
})
export class InstructorRegisterComponent implements OnInit {
  showSuccessMessage!: boolean;
  serverErrorMessages!: string;
  constructor(public userService: UserService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.resetForm(); 
    var s = document.getElementById("age");
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUsers = {
      userid:0,
      name: "",
      age: 18,
      email: "",
      password: "",
      confirm_password: "",
      courseid: "",
    };
    this.serverErrorMessages = '';
  }
  
    onSubmit(form: NgForm) {
        this.userService.postUser(form.value).subscribe((res) => {
          this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.userService.sendConfirmationMail(form.value).subscribe((res) => {
        });
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact admin.';
      }
    );
    }
}
