import { AfterContentInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { CityMstModel, CountryMstModel, StateMstModel } from 'app/model/AddressMstModel';
import { leadListModel } from 'app/model/LeadsModel';
import { IndustryMstModel, LeadSourceMstModel, LeadStatusMstModel } from 'app/model/LeadStatusModel';
import { LeadsService } from '../leads.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'create-edit-leads',
  templateUrl: './create-edit-leads.component.html',
  styleUrls: ['./create-edit-leads.component.scss']
})
export class CreateEditLeadsComponent implements OnInit, AfterContentInit {

  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    private _webApiHttp: WebApiHttp,
    private _dom: DomSanitizer,
    private leadService: LeadsService
    ) { }

  image: string ='' //mat_solid:person
  uploadedImage: any
  LeadCreate: FormGroup
  email_opt_out: boolean=false
  isSubmitted: boolean = false;
  leadCode:string=''
  countryList: Array<CountryMstModel> =[]
  fiteredCountryList: Array<CountryMstModel> =[]
  stateList: Array<StateMstModel> =[]
  fiteredstateList: Array<StateMstModel> =[]
  cityList: Array<CityMstModel> =[]
  fiteredcityList: Array<CityMstModel> =[]
  statusList: Array<LeadStatusMstModel> =[]
  fiteredStatusList: Array<LeadStatusMstModel> =[]
  sourceList: Array<LeadSourceMstModel> =[]
  fiteredSourceList: Array<LeadSourceMstModel> =[]
  industryList: Array<IndustryMstModel> =[]
  fiteredIndustryList: Array<IndustryMstModel> =[]
  ratingList: Array<string> =[]
  fiteredRatingList: Array<string> =[]
  profileImg:string =''

  @Input() data: Array<leadListModel>
  @ViewChild('top', {static:false}) top: ElementRef ;

  ngOnInit(): void {
    this.isSubmitted = false;
    this.leadCode =''
    this.getCountry()
    this.getLeadStatus()
    this.getLeadRating()
    this.getLeadSource()
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
      description: [''],
      campaign_code: [''],
      campaign_name: ['']
    })

    this.leadService.saveFile.subscribe(res=>{
      console.log(res)
      if(res){
        console.log('save here')
        this.SubmitChanges()
      }
    })


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
      this.LeadCreate.get('campaign_code').setValue(this.data[0]?.campaign_code)
      this.LeadCreate.get('campaign_name').setValue(this.data[0]?.campaign_name)
      this.profileImg = this.data[0]?.image_url
      this.email_opt_out = this.data[0]?.email_opt_out==1
      this.leadCode= this.data[0]?.lead_code
      this.getState(this.LeadCreate.get('country').value)
      this.getCity(this.LeadCreate.get('state').value)
    }
  }

  get getProfileImage(){
    let res = JSON.stringify(this._webApiHttp.globalurl + '/' +this.profileImg)
    return (res);
  }

  setFocus(ele){
    this.fiteredCountryList = this.countryList;
    this.fiteredcityList = this.cityList;
    this.fiteredstateList = this.stateList;
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }

  displayFnCountry(val) {
    console.log(val)
     let m = this.fiteredCountryList?.find(_ => {console.log(_); return _.country_code.toLowerCase() === this.LeadCreate.get('country').value.toLowerCase()})
     console.log(m,this.LeadCreate?.get('country')?.value.toLowerCase())

    return  val?this.fiteredCountryList.find(_ => _.country_code.toLowerCase() === val)?.country_name:undefined ;
  }

  ngAfterContentInit(): void {
    let element =document.getElementById("top");
    element.scrollIntoView();
  
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
    fileInput.setAttribute('accept','image/*')
    // fileInput.setAttribute('multiple','false')
    fileInput.click()
    fileInput.addEventListener('change', event =>{
      var file = fileInput.files[0];
      this.uploadedImage=file;
      console.log(this.uploadedImage)
      let formdata: FormData= new FormData()
      formdata.append('image',file)
      formdata.append('lead_code', this.data.length>0?this.data[0]?.lead_code:'')
      formdata.append('old_url', '')
      this.leadService.uploadProfileImage(formdata).then(res=>{
        this.profileImg = res[0]?.image_url
      })
      // let fileReader = new FileReader();
      //     fileReader.onload = (e) => {
      //       this.uploadedImage = fileReader.result;
      //     console.log(this.uploadedImage)
      //     }
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
      campaign_code: this.LeadCreate.get('campaign_code')?.value?.toString(),
      campaign_name: this.LeadCreate.get('campaign_name')?.value?.toString(),
      created_by: this._session.getEmail
    }
    if(this.data.length>0){
      json['lead_code']=this.leadCode
    }
    this.leadService.createLead(json)
  }

  ngOnDestroy(){

  }

  dropDownSearchFilter(value, array_name){
    if(array_name=='country'){
      if(value==''){
      this.fiteredCountryList = this.countryList
      }else{
        this.fiteredCountryList = this.countryList.filter(ele=>{
         
          return ele?.country_name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else if(array_name=='state'){
      if(value==''){
      this.fiteredstateList = this.stateList
      }else{
        this.fiteredstateList = this.stateList.filter(ele=>{
         
          return ele?.state_name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else if(array_name=='city'){
      if(value==''){
      this.fiteredcityList = this.cityList
        return
      }else{
        this.fiteredcityList = this.cityList.filter(ele=>{
          return ele?.city_name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else if(array_name=='status'){
      if(value==''){
      this.fiteredStatusList = this.statusList
        return
      }else{
        this.fiteredStatusList = this.statusList.filter(ele=>{
          return ele?.name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else if(array_name=='source'){
      if(value==''){
      this.fiteredStatusList = this.statusList
        return
      }else{
        this.fiteredStatusList = this.statusList.filter(ele=>{
          return ele?.name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else if(array_name=='rating'){
      if(value==''){
      this.fiteredRatingList = this.ratingList
        return
      }else{
        this.fiteredRatingList = this.ratingList.filter(ele=>{
          return ele.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }
  }
  getCountry(){
    this.countryList =[]
    this.leadService.getCountry().then(res=>{
      if(res.length>0 && res[0]?.condition.toLowerCase()=='true'){
        console.log('country')
        this.countryList = res
        this.fiteredCountryList = res
      }
    })
  }

  getState(val){
    console.log(val,this.LeadCreate.get('country').value)
    this.stateList =[]
    this.cityList =[]
    this.leadService.getState(val).then(res=>{
      if(res.length>0 && res[0]?.condition.toLowerCase()=='true'){
        console.log('state')
        this.stateList = res
        this.fiteredstateList = res
      }
    })
  }

  getLeadStatus(){
    this.statusList =[]
    this.leadService.getLeadStatus().then(res=>{
      if(res.length>0 && res[0]?.condition.toLowerCase()=='true'){
        console.log('status')
        this.statusList = res
        this.fiteredStatusList = res
      }
    })
  }

  getCity(val){
    this.cityList =[]
    this.leadService.getCity(val).then(res=>{
      if(res.length>0 && res[0]?.condition.toLowerCase()=='true'){
        console.log('city')
        this.cityList = res
        this.fiteredcityList = res
      }
    })
  }
  
  getLeadSource(){

  }

  getLeadRating(){
    this.ratingList =[]
    this.leadService.getRating().then(res=>{
      if(res.length>0 && res[0]?.condition.toLowerCase()=='true'){
        console.log('rating')
        this.ratingList = res[0]?.ratings
        this.fiteredRatingList  = res[0]?.ratings
      }
    })
  }

  resetDropDowns(ele){
    ele.value=''
    this.fiteredCountryList= this.countryList
    this.fiteredstateList=this.stateList;;
    this.fiteredcityList=this.cityList
  }
}
