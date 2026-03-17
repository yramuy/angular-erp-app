import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
})
export class AddFieldComponent {
  fields: any[] = [];
  isMessage: boolean = false;
  message: string = '';
  formData: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadFormFields();
  }

  loadFormFields() {
    let payload = JSON.stringify({
      plugin_id: '3',
      feature_id: '880',
    });
    this.apiService.request('POST', '/dynamicFormFields', payload).subscribe({
      next: (res: any) => {
        this.fields = res.formFields || [];
        console.log('Fields', res.formFields);
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

  saveField(form: NgForm) {
    if (form.invalid) {
      // mark all controls as touched
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
  }

  showMessage(msg: string) {
    this.message = msg;
    this.isMessage = true;

    setTimeout(() => {
      this.isMessage = false;
    }, 3000);
  }
}
