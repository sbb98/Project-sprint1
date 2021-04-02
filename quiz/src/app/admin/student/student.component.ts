import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  msg: any = [];
  public users: any[];
  avail: boolean;
  empty: boolean;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.empty=false;
    this.getdata();
  }

  getdata()
  {
    this.adminService.seestudent()
      .subscribe(
        data => {

          this.users = data['user']
          if(!this.users.length)
          {
            this.empty = true;

          }
          else
          {
            this.empty = false;
          }
        },
        error => {
          console.error(error);
        }


      )

  }

  block(user) {
    var userid = user._id;
    this.adminService.blockuser(userid).subscribe(
      data => {

        this.router.navigate(['/admin/adminhome']);
      },
      (error) => {


        console.log(error);
      }
    )
  }

  unblock(user) {
    var userid = user._id;
    this.adminService.unblockuser(userid).subscribe(
      data => {
        this.router.navigate(['/admin/adminhome']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
