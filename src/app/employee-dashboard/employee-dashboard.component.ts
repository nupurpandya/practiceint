import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  empData: any;
  constructor(private fb:FormBuilder,private api:ApiService) { }
  id:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  ngOnInit(): void {
    this.formValue=this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    
    this.getEmployeeData();
  }
  addEmployee(){
    this.api.postEmployee(this.formValue.value).subscribe(res=>{res;
    // alert("Employee added successfully");
    this.formValue.reset();
    let ref=document.getElementById('cancel');
    ref?.click();
    this.getEmployeeData();
  });
  }
  getEmployeeData(){
    this.api.getEmployee().subscribe(res=>{
    this.empData=res;
    })
    
  }
  removeEmployee(a:any){
    this.api.removeEmployee(a).subscribe(res=>{res;
    this.getEmployeeData()})
    
  }
  onEdit(a:any){
     this.id=a.id;
    this.formValue.controls['firstName'].setValue(a.firstName);
    this.formValue.controls['lastName'].setValue(a.lastName);
    this.formValue.controls['email'].setValue(a.email);
    this.formValue.controls['mobile'].setValue(a.mobile);
    this.formValue.controls['salary'].setValue(a.salary);
    this.showAdd=false;
    this.showUpdate=true;
  }
  updateEmployee(){
    this.api.updateEmployee(this.id,this.formValue.value).subscribe(res=>{res;this.getEmployeeData(); this.formValue.reset();
      let ref=document.getElementById('cancel');
      ref?.click();});
  }
  onAddClick(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
}