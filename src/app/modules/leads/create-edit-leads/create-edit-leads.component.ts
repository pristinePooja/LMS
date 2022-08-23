import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { LeadsService } from '../leads.service';


@Component({
  selector: 'create-edit-leads',
  templateUrl: './create-edit-leads.component.html',
  styleUrls: ['./create-edit-leads.component.scss']
})
export class CreateEditLeadsComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    private leadService: LeadsService
    ) { }
  image: string ='mat_solid:person'
  uploadedImage: any
  LeadCreate: FormGroup
  email_opt_out: boolean=false
  @Input() set saveChanges (val: boolean){
    console.log(val)
    if(val){
      this.SubmitChanges()
    }
  }
  ngOnInit(): void {
    this.LeadCreate = this._fb.group({
      lead_owner: [this._session.getEmail],
      company: ['',Validators.required],
      first_name: [''],
      last_name: ['',Validators.required],
      title: [''],
      email: ['', Validators.email],
      fax: [''],
      phone: [''],
      mobile: [''],
      website: [''],
      lead_source: [''],
      lead_status: [''],
      industry: [''],
      no_of_employees: [Number(0), Validators.min(0) ],
      annual_revenue: [Number(0), Validators.min(0)],
      rating: [],
      // email_opt_out: [false],
      skype_id: [''],
      secondary_email: ['', Validators.email],
      twitter: [''],
      street: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      country: [''],
      description: ['']
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

    this.leadService.createLead(this.LeadCreate.value)
  }
}
