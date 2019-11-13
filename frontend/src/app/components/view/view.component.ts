import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../../shared/issue.model';
import { FileUploadService } from '../../shared/file-upload.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  issues : any = [];


  constructor( public fileUploadService: FileUploadService, public router: Router) { }

  ngOnInit() {
    this.fileUploadService.getIssues().subscribe(data=>{
      for(const d of (data as any)){
        this.issues.push({
          title: d.title,
          responsible: d.responsible,
          file: d.file,
          description: d.description,
          severity: d.severity
        })
      }
      console.log(this.issues)

   });
  }

}
