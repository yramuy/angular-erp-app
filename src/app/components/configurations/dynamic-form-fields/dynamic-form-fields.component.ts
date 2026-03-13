import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dynamic-form-fields',
  templateUrl: './dynamic-form-fields.component.html',
  styleUrls: ['./dynamic-form-fields.component.css']
})
export class DynamicFormFieldsComponent {

  formFields: any[] = [];
  isMessage: boolean = false;
  message: string = "";

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.loadDynamicFormFields();
  }

  loadDynamicFormFields() {
    this.apiService.request('GET', '/allDynamicFormFields').subscribe({
      next: (res: any) => {
        this.formFields = res.formFields || [];
      },
      error: (err) => {
        if(err.status === 401) {
          this.showMessage("Unauthorized request");
        } else {
          this.showMessage("Server error, something went wrong, please try again");
        }
      }
    });
  }

  showMessage(msg: string) {
    this.message = msg;
    this.isMessage = true;

    setTimeout(() => {
      this.isMessage = false;
    }, 3000);
  }

}
