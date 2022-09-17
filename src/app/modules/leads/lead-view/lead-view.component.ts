import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from '@microsoft/signalr';
import { slideInTop } from '@pristine/animations/slide';
import { FileHandle } from '@pristine/directives/dragDrop.directive';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { PristineConfirmationDialogComponent } from '@pristine/services/confirmation/dialog/dialog.component';
import { notesModel } from 'app/model/NotesModel';

import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss'],
  animations: [slideInTop]
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

  // Attachments
  files: FileHandle[] = [];
  attachmentType:'file'|'URL'|''=''
  attachmentsUploadList: Array<any>=[]
  attachmentDialog: any
  attachmnetLink: {attachment_url:string,attachment_title:string}={attachment_url:'',attachment_title:''}
  AttachmentList: Array<any>=[]
  validAttachmentLink
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
    this._leadService.addNotes.subscribe(res=>{
      console.log(res)
      this.addNotes = res;
       if(!res){this.resetNotes();}
      })
    this._leadService.selectedLead.subscribe(res=>{
      this.viewDetailsData = res?.all
      if(this.viewDetailsData?.lead_code){
      this.getNotes()
      this.getAttachments()
      this.timeFrameArrayGenerator()}
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

  openPopUp(type,src){
    if(src=='attachent'){
      this._leadService.openAttachmentPopUp(type)
    }
    else if(src=='call'){ 
      this._leadService.openMeetingPopUp(type)
    }
  }


  noteToggle(val){
    this._leadService.addNotes.next(val)
  }

  editNote(element){
    this._leadService.addNotes.next(true)
    this.remarkText = element.remarks;
    this.titleText = element.note_title;
    this.edit_note_code = element.note_id
  }

  resetNotes(){
    if(this.addNotes){
      this._leadService.addNotes.next(false)
    }
    this.addTitle=false;
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
          this._leadService.viewFilterCountUpdate('notes', this.noteList?.length)
        }else{
          this.noteList =[]
          this._leadService.viewFilterCountUpdate('notes', 0)
        }
      },err=>{console.log(err)}).catch(err=>{}).finally(()=>{})
    }catch(err){

    }
  }

  getAttachments(){
    this._leadService.getAttachmentList.subscribe(res=>{
      console.log(res)
      if(res.length>0 && res[0]?.condition?.toString()?.toLowerCase() =='true'){
        this.AttachmentList = res
        this._leadService.viewFilterCountUpdate('attachments', this.AttachmentList?.length)
      }else{
        this.AttachmentList =[]
        this._leadService.viewFilterCountUpdate('attachments', this.AttachmentList?.length)
      }
    },err=>{console.log(err)})
    try{
      this._leadService.getAttachment(this.viewDetailsData?.lead_code).then(res=>{
        this._leadService.getAttachmentList.next(res)
       }).catch(err=>{}).finally(()=>{})
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
      if((files.length + this.notesAttachments.length) >2 && src=='notes'){
        this._toaster.error('Can not upload more than two files')
        return
      }
      let temp_size =+ this.notesAttachments.map(ele=>ele.size)
      if(files.size + temp_size>20971520 && src=='notes'){
        this._toaster.error('Total file size >20Mb')
        return
      }
      temp_size =+ this.attachmentsUploadList.map(ele=>ele.size)
      if(files.size + this.attachmentsUploadList.map(ele=>ele.size)>104857600 && src=='attachment'){
        this._toaster.error('Total file size >100Mb')
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
      }else if(src=='attachment'){
        this.attachmentsUploadList.push(...temp_arr)
      }
    console.log(this.attachmentsUploadList)

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
    }else if(src=='attachment'){
      this.attachmentsUploadList.splice(index,1 )
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
    this._leadService.insertNotes(data).then(res=>{
      console.log(res)
      if(res.length>0 && res[0]?.condition?.toString()?.toLowerCase() =='true'){
        ele.target.disabled = false
        this.resetNotes()
        this.noteList = res
        this._leadService.viewFilterCountUpdate('notes', this.noteList?.length)
      }else{
        this.noteList =[]
        this._leadService.viewFilterCountUpdate('notes', this.noteList?.length)
      }
    },err=>{console.log(err)}).catch(err=>{}).finally(()=>{})
  }

  filesDropped(files: FileHandle[]): void {
    console.log(files)
    let temp_size =0;
    temp_size =+ this.attachmentsUploadList.map(ele=>ele.size)
    let temp_files=[]
    files.map(ele=>{
      temp_files.push(ele?.file)
      temp_size =+ ele?.file?.size
      
    })
    if(temp_size >104857600){
      this._toaster.error('Total file size >100Mb')
      return
    }
    this.attachmentsUploadList =this.attachmentsUploadList.concat(...temp_files)
    console.log(this.attachmentsUploadList)
  }

  

  deleteAttachment(ele){
    console.log(ele)
    const confim = this._dialog.open(PristineConfirmationDialogComponent)
    confim.componentInstance.data={
      "title": "Remove Attachment",
      "message": "Are you sure you want to remove this document permanently? <span class=\"font-medium\">This action cannot be undone!</span>",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    console.log(ele)
    confim.afterClosed().subscribe(data=>{
      if(data=='confirmed'){
        let json ={
          "lead_code": this.viewDetailsData?.lead_code,
          "id": ele?.id,
          "attachment_url": ele?.attachment_url
        }
        console.log(json)
        this._leadService.deleteAttachment(json).then(res=>{
          if(res.length>0 && res[0]?.condition?.toString()?.toLowerCase() =='true'){
            this.AttachmentList = res
            this._leadService.viewFilterCountUpdate('attachments', this.AttachmentList?.length)
          }else{
            this.AttachmentList =[]
            this._leadService.viewFilterCountUpdate('attachments', this.AttachmentList?.length)
          }
        },err=>{console.log(err)}).catch(err=>{}).finally(()=>{})
      }
    })
    
  }


}
