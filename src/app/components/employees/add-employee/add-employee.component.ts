import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  formFields: any[] = [];
  formData: any = {};

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.loadDynamicFormFields();
  }

  loadDynamicFormFields() {

    const body = JSON.stringify({
      plugin_id: "3",
      feature_id: "4"
    });

    this.apiService.request("POST", "/dynamicFormFields", body).subscribe({

      next: (res: any) => {
        this.formFields = res.formFields || [];
        this.loadControlValue();
        console.log("Form Fields ", this.formFields);
      },

      error: (err: any) => {
        if (err.status === 401) {
          alert('Failed to load Dynamic Form');
          this.authService.setLoginStatus(false);
        } else {
          alert('Something went wrong. Please try again');
        }
      }

    });

  }

  loadControlValue() {
    this.formFields.forEach(field => {
      if (field.control_value) {
        this.formData[field.field_name] = field.control_value;
      }
    });
  }

  saveEmployee() {

    console.log('Save Body', this.formData);
  }
}
