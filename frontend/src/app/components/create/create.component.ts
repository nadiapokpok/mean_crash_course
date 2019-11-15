 
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

  addIssue(title, responsible, file, description, severity, status) {

    if (file)
      file = file._files[0];
    
    this.fileUploadService.addIssue(title, responsible, file,
       description, severity, status).subscribe((issues) => {
       console.log("issues:",issues)
        this.router.navigate(['/list'])

    })
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
  ngOnInit() {}

}
