import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { notesModel } from 'app/model/NotesModel';
import { ToastrService } from 'ngx-toastr';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {

  sidePanelOpen: boolean= false
  active: string ='overview';
  @Input() viewDetailsData: any =''
  @ViewChild('titleRef', {static:false}) titelRef: ElementRef<any>
  @ViewChild('addAttachmentRef', {static:false}) addAttachmentRef: TemplateRef<any>
  activeClass: string='border-solid border rounded-3xl border-sky-400 bg-sky-50'
  nextDates:Array<any>[]
  date: Date = new Date()
  timeSelected : any
  timeArray:Array<{name:string, value:string}>=[]
  showDets: boolean = true;

  // Notes
  addNotes: boolean = false
  addTitle: boolean = false
  remarkText:string =''
  titleText: string =''
  alert: {type:string, message: string}
  notesAttachments:Array<any> =[]
  noteList: Array<notesModel> =[]
  edit_note_code: string =''
  attachmentType:'file'|'link'
  constructor(private _leadService: LeadsService,
              private _session: SessionManagement,
              private sanatize: DomSanitizer,
              private _dialog: MatDialog,
              private _webApiHttp: WebApiHttp,
              private _toaster: ToastrService,
              private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this._leadService.viewFilterOpen.subscribe(res=>{
      this.sidePanelOpen = res
    })
    this._leadService.selectedLead.subscribe(res=>{
      this.viewDetailsData = res?.all
      this.getNotes()
      this.timeFrameArrayGenerator()
    })
  }
  openSidePanel(){
    this._leadService.viewFilterOpen.next(true)
  }

  timeFrameArrayGenerator(){
    for(let i=0; i< 6; i++){
      let d: Date =this.date
      if(i==0){
            this.timeArray.push({name:'Today', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else if(i==1){
          this.timeArray.push({name:'Tomorrow', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else{
    this.timeArray.push({name:this._datePipe.transform(d,'EEE, MMM dd'), value:this._datePipe.transform(d,'yyyy/MM/dd') })}
    d.setDate(this.date.getDate()+1)
    }
    this.timeSelected = this.timeArray[0]

  }

 

  setNoteTitle(){
    this.addTitle = true
    setTimeout(()=>{this.titelRef.nativeElement.focus()},300)
  }

  openPopUp(type){
    this._dialog.open(this.addAttachmentRef,{maxWidth:'480px',minWidth:'480px',position: {'top':'-20px'}})
  }

  editNote(element){
    this.addNotes = true
    this.remarkText = element.remarks;
    this.titleText = element.note_title;
    this.edit_note_code = element.note_id
  }

  resetNotes(){
    this.addTitle=false;
    this.addNotes=false;
    this.titleText=''
    this.remarkText =''
    this.edit_note_code =''
    this.notesAttachments=[]
  }

  getNotes(){
    try{
      this._leadService.getLeadNotes(this.viewDetailsData?.lead_code, '').then(res=>{
        console.log(res)
        if(res.length>0 && res[0]?.condition?.toString()?.toLowerCase() =='true'){
          this.noteList = res
        }else{
          this.noteList =[]
        }
      },err=>{console.log(err)}).catch(err=>{}).finally(()=>{})
    }catch(err){

    }
  }

  addAttachment(src){
    var input_element: any = document.createElement('input');
    input_element.setAttribute('type', 'file');
    input_element.setAttribute('multiple','');
    input_element.click();

    input_element.addEventListener('change', event=>{
      let files = input_element.files;
      if((files.length + this.notesAttachments.length) >2 ){
        this._toaster.error('Can not upload more than two files')
        
        return
      }
      let temp_size =+ this.notesAttachments.map(ele=>ele.size)
      if(files.size + temp_size>20971520){
        this._toaster.error('Total file size >20Mb')
        return
      }
      let temp_arr =[]
      for(var file = 0; file < files.length; file++){   
        temp_arr.push({name: files[file].name, data: files[file],size: files[file].size});
      }
      console.log(temp_arr)
  
      if(src=='notes'){
        console.log(temp_arr, ...temp_arr)
        this.notesAttachments.push(...temp_arr)
      }
    console.log(this.notesAttachments)

    })
  
    }

    bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
      return (bytes / Math.pow(1024, i)).toPrecision(2) + ' ' + sizes[i];
   }
   removeFile(src, index){
    if(src=='notes'){
      this.notesAttachments.splice(index,1 )
    }
   }
   getUrl(url){
    // console.log(this.sanatize.bypassSecurityTrustResourceUrl(this._webApiHttp.globalurl  +'\\'+ url))
    return this.sanatize.bypassSecurityTrustResourceUrl(this._webApiHttp.globalurl +'\\'+ url)
   }

   splitText(img:string, type)
   {
    if(type=='name'){
      return img.split('\\Notes\\')[1]
    }else if(type=='ext'){
      return img.split('.')[1]
    }else if(type =='icon'){
      return  (img.split('.')[1]=='jpg' || img.split('.')[1]== 'jpeg' || img.split('.')[1]== 'png') ?'feather:image':'feather:file'
    }
   }

  saveNotes(ele){
    ele.target.disabled=true
    let data = new FormData
    data.append('note_title',this.titleText)
    data.append('note_id',this.edit_note_code)
    data.append('lead_code',this.viewDetailsData?.lead_code)
    data.append('remarks',this.remarkText)
    data.append('created_by',this._session.getEmail)
    this.notesAttachments.map(ele=>{
      data.append('attachments',ele.data)
    })

    data.forEach(ele=>{console.log(ele)})
   
    // let json ={
    //   note_title: '',
    //   note_id: '',
    //   lead_code: '',
    //   remarks: '',
    //   created_by: '',
    //   attachments: ''
    // }
    this._leadService.insertNotes(data).then(res=>{
      console.log(res)
      if(res.length>0 && res[0]?.condition?.toString()?.toLowerCase() =='true'){
        ele.target.disabled = false
        this.resetNotes()
        this.noteList = res
      }else{
        this.noteList =[]
      }
    },err=>{console.log(err)}).catch(err=>{}).finally(()=>{})
  }catch(err){

  }
}
