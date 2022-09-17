import { Component, Inject, OnInit } from '@angular/core';
import { LeadsService } from '../../modules/leads/leads.service';
import {} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html'
})
export class FileUploaderComponent implements OnInit {

  attachmentType:'file'|'URL'|''=''
  attachmentsUploadList: Array<any>=[]
  attachmnetLink: {attachment_url:string,attachment_title:string}={attachment_url:'',attachment_title:''}

  constructor(
    private _leadService: LeadsService,
    private _session: SessionManagement,
    private _toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA)public _data: any
  ) { }

  ngOnInit(): void {
    console.log(this._data)
    this.attachmentType = this._data?.attachmentType
    console.log(this._data)
  }

  splitText(img:string, type){
      return  (img.split('.')[1]=='jpg' || img.split('.')[1]== 'jpeg' || img.split('.')[1]== 'png') ?'feather:image':'feather:file'
  }
   

   removeFile(src, index){
    this.attachmentsUploadList.splice(index,1 )
   }

  addAttachment(){
    var input_element: any = document.createElement('input');
    input_element.setAttribute('type', 'file');
    input_element.setAttribute('multiple','');
    input_element.click();

    input_element.addEventListener('change', event=>{
      let files = input_element.files;
     
      let temp_size =+ this.attachmentsUploadList.map(ele=>ele.size)
      if(files.size + this.attachmentsUploadList.map(ele=>ele.size)>104857600 ){
        this._toaster.error('Total file size >100Mb')
        return
      }
      let temp_arr =[]
      for(var file = 0; file < files.length; file++){   
        temp_arr.push({name: files[file].name, data: files[file],size: files[file].size});
      }
      console.log(temp_arr)
        this.attachmentsUploadList.push(...temp_arr)
    console.log(this.attachmentsUploadList)

    })
  
    }


  upload(){
    let formData: FormData = new FormData()
    formData.append('lead_code', this._data?.lead_data.lead_code)
    formData.append('attachment_type', this.attachmentType)
    formData.append('created_by',this._session.getEmail)
    this.attachmentsUploadList.map(ele=>{
      formData.append('attachments',ele.data)
    })
    formData.append('attachmentStringList', JSON.stringify([this.attachmnetLink]))

    return {type:'save', data:formData}
  }
  bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return (bytes / Math.pow(1024, i)).toPrecision(2) + ' ' + sizes[i];
 }
}
