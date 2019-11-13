 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router'; 
import { FileUploadService } from '../../shared/file-upload.service'
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  preview: string;
  createForm: FormGroup;
  percentDone: any = 0;
  issues = [];

  constructor(
    public fb: FormBuilder,
    public router: Router, 
    public fileUploadService: FileUploadService) {
    this.createForm = this.fb.group({
      title: [''],
      responsible: [''],
      file: null,
      description: [''],
      severity: ['']
    });
  }
  ngOnInit() {}

  addIssue(title, responsible, file, description, severity, status) {
    console.log(file._files[0])
    this.fileUploadService.addIssue(title, responsible, file._files[0],
       description, severity, status).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createForm.patchValue({
      file: file
    });
    this.createForm.get('file').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addIssue(
      this.createForm.value.name,
      this.createForm.value.responsible,
      this.createForm.value.file,
      this.createForm.value.description,
      this.createForm.value.severity,
      this.createForm.value.status
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['/list'])
      }
    })
  }

}
