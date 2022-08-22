import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadsService } from '../leads.service';


@Component({
  selector: 'create-edit-leads',
  templateUrl: './create-edit-leads.component.html',
  styleUrls: ['./create-edit-leads.component.scss']
})
export class CreateEditLeadsComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private leadService: LeadsService
    ) { }
  image: string ='mat_solid:person'
  uploadedImage: any
  LeadCreate: FormGroup
  @Input() set saveChanges (val: boolean){
    if(val){
      this.SubmitChanges()
    }
  }
  ngOnInit(): void {
    this.LeadCreate = this._fb.group({
      lead_owner: [''],
      company: ['',Validators.required],
      first_name: [''],
      last_name: ['',Validators.required],
      title: [''],
      email: [''],
      fax: [''],
      phone: [''],
      mobile: [''],
      website: [''],
      lead_source: [''],
      lead_status: [''],
      industry: [''],
      no_of_employees: [''],
      annual_revenue: [''],
      rating: [''],
      // email_opt_out: [''],
      skype_id: [''],
      secondary_email: [''],
      twitter: [''],
      street: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      country: [''],
      description: [''],
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

  SubmitChanges(){
    if(this.LeadCreate.invalid){
      return
    }

    this.leadService.createLead(this.LeadCreate.getRawValue)
  }
}
