import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'create-edit-leads',
  templateUrl: './create-edit-leads.component.html',
  styleUrls: ['./create-edit-leads.component.scss']
})
export class CreateEditLeadsComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }
  image: string ='mat_solid:person'
  uploadedImage: any
  LeadCreate: FormGroup
  ngOnInit(): void {
    this.LeadCreate = this._fb.group({
      lead_owner: ['',Validators.required],
      company: ['',Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      title: ['',Validators.required],
      email: ['',Validators.required],
      fax: ['',Validators.required],
      phone: ['',Validators.required],
      mobile: ['',Validators.required],
      website: ['',Validators.required],
      lead_source: ['',Validators.required],
      lead_status: ['',Validators.required],
      industry: ['',Validators.required],
      no_of_employees: ['',Validators.required],
      annual_revenue: ['',Validators.required],
      rating: ['',Validators.required],
      email_opt_out: ['',Validators.required],
      skype_id: ['',Validators.required],
      secondary_email: ['',Validators.required],
      twitter: ['',Validators.required],
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zipcode: ['',Validators.required],
      country: ['',Validators.required],
      description: ['',Validators.required],
    })
  }

  openDrawer(contain){

  }

  uploadImage(){
    let fileInput = document.createElement('input')
    fileInput.setAttribute('type','file')
    fileInput.click()
    fileInput.addEventListener('change', event =>{
      var file = (<HTMLInputElement>event.target).files[0];
      let fileReader = new FileReader();
          fileReader.onload = (e) => {
            this.uploadedImage = fileReader.result;
            console.log(this.uploadImage)
          }
       
    })
  }
}
