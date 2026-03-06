import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{

  useres: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.loadUseres();
  }

    ngAfterViewInit() {

    setTimeout(() => {

      if ($.fn.DataTable.isDataTable('#userTable')) {
        $('#userTable').DataTable().destroy();
      }

      $('#userTable').DataTable(
        {
          dom: 'Bfrtip',
          buttons: [
            'excelHtml5',
            'pdfHtml5'
          ]
        }
      );
    }, 300);
  }

  loadUseres(): void {
    this.apiService.request('GET', '/useres').subscribe({
      next: (res: any) => {
        this.useres = res.useres || [];
      },
      error: (err: any) => {
        if (err.status === 401) {
          alert('Failed to load users');
          this.authService.setLoginStatus(false);
        } else {
          alert('Something went wrong. Please try again');
        }
      }
    });
  }

}
