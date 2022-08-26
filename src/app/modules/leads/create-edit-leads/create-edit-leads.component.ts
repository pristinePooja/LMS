import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { LeadsService } from '../leads.service';


@Component({
  selector: 'create-edit-leads',
  templateUrl: './create-edit-leads.component.html',
  styleUrls: ['./create-edit-leads.component.scss']
})
export class CreateEditLeadsComponent implements OnInit, AfterContentInit {

  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    private leadService: LeadsService
    ) { }
  image: string ='mat_solid:person'
  uploadedImage: any
  LeadCreate: FormGroup
  email_opt_out: boolean=false
  isSubmitted: boolean = false;
  @ViewChild('top', {static:false}) top: ElementRef ;
  ngOnInit(): void {
    console.log('hey')
    this.isSubmitted = false;
    
    

    this.LeadCreate = this._fb.group({
      lead_owner: [this._session.getEmail],
      company: ['',{validators: [Validators.required],updateOn: 'blur'}],
      first_name: [''],
      last_name: ['',{validators: [Validators.required],updateOn: 'blur'}],
      title: [''],
      email: ['', {validators: [Validators.email], updateOn: 'blur'}],
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

    this.leadService.saveFile.subscribe(res=>{
      console.log(res)
      if(res){
        console.log('save here')
        this.SubmitChanges()
      }
    })
  }

  ngAfterContentInit(): void {
    let element =document.getElementById("top");
    element.scrollIntoView();
  }
  openDrawer(contain){

  }

  checkValidation(label): boolean{
    if(this.LeadCreate.get(label).invalid && 
    (this.LeadCreate.get(label).dirty || this.LeadCreate.get(label).touched || this.isSubmitted) ){
      return true
    }else{
      return false
    }
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
    this.isSubmitted = true
    if(this.LeadCreate.invalid){
      console.log('Invalid')
      this.leadService.toaster.next({type:'warn',message:'Invalid data inserted'})
      return
    }
    this.leadService.createLead(this.LeadCreate.value)
  }

  con(){
    console.log(this.LeadCreate.get('lead_owner').status,this.LeadCreate.get('lead_owner'),)
  }
}
