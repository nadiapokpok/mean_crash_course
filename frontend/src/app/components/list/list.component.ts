import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Issue } from '../../shared/issue.model';
import { FileUploadService } from '../../shared/file-upload.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[]
  displayedColumns = ['title', 'responsible','file', 'description',
  'severity', 'status', 'actions'];

  constructor(public fileUploadService: FileUploadService, public router: Router) { }

  ngOnInit() {
    //on s'abonne pour voir ce qu'on a sollicité à l'uri correspondante ds issueservice
    /*this.issueService.getIssues().subscribe((issues) =>{
      console.log(issues);
    })*/

    this.fetchIssues();
  }

  fetchIssues() {
    this.fileUploadService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log(data)
        console.log('tutu');
        console.log('Data requested ...');
        console.log(this.issues);
      });
  }

  editIssue(id) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  deleteIssue(id) {
    this.fileUploadService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
