import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {loadingmessage, loadingstyle} from "./model/loadingtext";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    loading_style: any = loadingstyle;
    textindex: number = 0;
    styleindex: number = 0;
    funny_loading_text: any = loadingmessage;

    /**
     * Constructor
     */
    constructor(private toast: ToastrService)
    {
    }

    ngOnInit(): void {
    }

      // get random(){
      //   let color =['#03cea4','#f4b333','#e40066']
      //   return color[Math.floor(Math.random()*10% (color.length - 1))]
      // }
}
