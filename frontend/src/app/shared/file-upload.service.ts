import { Injectable } from '@angular/core';
import { Issue} from './issue.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class FileUploadService {
  
    uri = 'http://localhost:4000';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) { }

  // Get Issues
  getIssues() {
    return this.http.get(this.uri + '/issues/')
  }

  // Get Issues
  getIssueById(id) {
    return this.http.get(this.uri +`/issues/${id}`)
  }

  // Create
  addIssue(title: string,
          responsible: string,
          file: File,
          description: string,
          severity: string,
          status: string): Observable<any> {
    var formData: any = new FormData();
   
    formData.append("title", title);
    formData.append("responsible",responsible);
    formData.append("file", file);
    formData.append("description", description);
    formData.append("severity", severity);
    formData.append("status", status);
    return this.http.post<Issue>(`${this.uri}/issues/add`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  // Error handling 
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
//edit

updateIssue(id:string, 
  title: string,
  responsible: string,
  file: File,
  description: string,
  severity: string,
  status: string): Observable<any> {
var formData: any = new FormData();
formData.append("_id",id)
formData.append("title", title);
formData.append("responsible",responsible);
formData.append("file", file);
formData.append("description", description);
formData.append("severity", severity);
formData.append("status", status);
return this.http.post<Issue>(`${this.uri}/issues/update/${id}`, formData, {
reportProgress: true,
observe: 'events'
})
}
// Error handling 
errorMgm(error: HttpErrorResponse) {
let errorMessage = '';
if (error.error instanceof ErrorEvent) {
// Get client-side error
errorMessage = error.error.message;
} else {
// Get server-side error
errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
console.log(errorMessage);
return throwError(errorMessage);
}
deleteIssue(id){
return this.http.get(`${this.uri}/issues/delete/${id}`)
}

}







