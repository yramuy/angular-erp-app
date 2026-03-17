import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MenuService } from 'src/app/services/menu.service';
declare var $: any;

@Component({
  selector: 'app-dynamic-form-fields',
  templateUrl: './dynamic-form-fields.component.html',
  styleUrls: ['./dynamic-form-fields.component.css'],
})
export class DynamicFormFieldsComponent {
  formFields: any[] = [];
  isMessage: boolean = false;
  message: string = '';

  constructor(private apiService: ApiService, private router: Router, public menuService: MenuService) {}

  ngOnInit() {
    this.loadDynamicFormFields();
  }

  loadDynamicFormFields() {
    this.apiService.request('GET', '/allDynamicFormFields').subscribe({
      next: (res: any) => {
        this.formFields = res.formFields || [];
        setTimeout(() => {
          this.initializeDataTable();
        }, 0);
        console.log('Form Field', this.formFields);
      },
      error: (err) => {
        if (err.status === 401) {
          this.showMessage('Unauthorized request');
        } else {
          this.showMessage(
            'Server error, something went wrong, please try again',
          );
        }
      },
    });
  }

  initializeDataTable() {
    if ($.fn.DataTable.isDataTable('#formFieldsTable')) {
      $('#formFieldsTable').DataTable().destroy();
    }

    $('#formFieldsTable').DataTable({
      dom: 'Bfrtip',
      buttons: ['excelHtml5', 'pdfHtml5'],
    });
  }

  addFieldBtn() {
    this.router.navigate(['/dynamic-form-fields/add']);
    this.menuService.menus['config'] = true;
  }

  showMessage(msg: string) {
    this.message = msg;
    this.isMessage = true;

    setTimeout(() => {
      this.isMessage = false;
    }, 3000);
  }
}
