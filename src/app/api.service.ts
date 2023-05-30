import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee-dashboard/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url='http://localhost:3000/employee'
  constructor(private http:HttpClient) { }
  postEmployee(data:any){
    return this.http.post(this.url,data);
  }
  getEmployee(){
    return this.http.get(this.url)
    
  }
  removeEmployee(id:any){
    return this.http.delete(this.url+"/"+id)
  }
  updateEmployee(id:any,body:any){
    return this.http.put(this.url+"/"+id,body)
  }
}
