import { AfterContentInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { leadListModel } from 'app/model/LeadsModel';
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
  leadCode:string=''
  @Input() data: Array<leadListModel>
  @ViewChild('top', {static:false}) top: ElementRef ;
  ngOnInit(): void {
    this.isSubmitted = false;
    this.leadCode =''
    

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

    console.log(this.data)
    if(this.data?.length>0){
      this.LeadCreate.get('lead_owner').setValue(this.data[0]?.lead_owner)
      this.LeadCreate.get('company').setValue(this.data[0]?.company)
      this.LeadCreate.get('first_name').setValue(this.data[0]?.first_name)
      this.LeadCreate.get('last_name').setValue(this.data[0]?.last_name)
      this.LeadCreate.get('title').setValue(this.data[0]?.title)
      this.LeadCreate.get('email').setValue(this.data[0]?.email)
      this.LeadCreate.get('fax').setValue(this.data[0]?.fax)
      this.LeadCreate.get('phone').setValue(this.data[0]?.phone)
      this.LeadCreate.get('mobile').setValue(this.data[0]?.mobile)
      this.LeadCreate.get('website').setValue(this.data[0]?.website)
      this.LeadCreate.get('lead_source').setValue(this.data[0]?.lead_source)
      this.LeadCreate.get('lead_status').setValue(this.data[0]?.lead_status)
      this.LeadCreate.get('industry').setValue(this.data[0]?.industry)
      this.LeadCreate.get('no_of_employees').setValue(this.data[0]?.no_of_employees)
      this.LeadCreate.get('annual_revenue').setValue(this.data[0]?.annual_revenue)
      this.LeadCreate.get('rating').setValue(this.data[0]?.rating)
      this.LeadCreate.get('skype_id').setValue(this.data[0]?.skype_id)
      this.LeadCreate.get('secondary_email').setValue(this.data[0]?.secondary_email)
      this.LeadCreate.get('twitter').setValue(this.data[0]?.twitter)
      this.LeadCreate.get('street').setValue(this.data[0]?.street)
      this.LeadCreate.get('city').setValue(this.data[0]?.city)
      this.LeadCreate.get('state').setValue(this.data[0]?.state)
      this.LeadCreate.get('zipcode').setValue(this.data[0]?.zipcode)
      this.LeadCreate.get('country').setValue(this.data[0]?.country)
      this.LeadCreate.get('description').setValue(this.data[0]?.description)
      this.email_opt_out = this.data[0]?.email_opt_out==1
      this.leadCode= this.data[0]?.lead_code
    }
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

    let json= {
      lead_owner: this.LeadCreate.get('lead_owner').value.toString(),
      company: this.LeadCreate.get('company').value.toString(),
      first_name: this.LeadCreate.get('first_name').value.toString(),
      last_name: this.LeadCreate.get('last_name').value.toString(),
      title: this.LeadCreate.get('title').value.toString(),
      email: this.LeadCreate.get('email').value.toString(),
      fax: this.LeadCreate.get('fax').value.toString(),
      phone: this.LeadCreate.get('phone').value.toString(),
      mobile: this.LeadCreate.get('mobile').value.toString(),
      website: this.LeadCreate.get('website').value.toString(),
      lead_source: this.LeadCreate.get('lead_source').value.toString(),
      lead_status: this.LeadCreate.get('lead_status').value.toString(),
      industry: this.LeadCreate.get('industry').value.toString(),
      no_of_employees: this.LeadCreate.get('no_of_employees').value,
      annual_revenue: this.LeadCreate.get('annual_revenue').value,
      rating: this.LeadCreate.get('rating').value,
      email_opt_out: this.email_opt_out?'1':'0',
      skype_id: this.LeadCreate.get('skype_id').value.toString(),
      secondary_email: this.LeadCreate.get('secondary_email').value.toString(),
      twitter: this.LeadCreate.get('twitter').value.toString(),
      street: this.LeadCreate.get('street').value.toString(),
      city: this.LeadCreate.get('city').value.toString(),
      state: this.LeadCreate.get('state').value.toString(),
      zipcode: this.LeadCreate.get('zipcode').value.toString(),
      country: this.LeadCreate.get('country').value.toString(),
      description: this.LeadCreate.get('description').value.toString(),
      created_by: this._session.getEmail
    }
    if(this.data.length>0){
      json['lead_code']=this.leadCode
    }
    this.leadService.createLead(json)
  }

}
