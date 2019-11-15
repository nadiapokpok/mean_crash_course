import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileUploadService } from '../../shared/file-upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public fileUploadService: FileUploadService, 
    public router: Router, public route: ActivatedRoute, 
    public snackBar: MatSnackBar, public fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      _id: '',
      title: '',
      responsible: '',
      file: File,
      description: '',
      severity: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.fileUploadService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('_id').setValue(this.issue._id);
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('file').setValue(this.issue.file);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(id,title, responsible, file, description, severity, status) {
    if (file)
      file = file._files[0];
    this.fileUploadService.updateIssue(id, title, responsible, file,
      description, severity, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
