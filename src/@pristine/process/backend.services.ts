import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WebApiHttp } from "./WebApiHttp.services";


export class PendingRequest {
  url: string;
  method: string;
  options: any;
  subscription: Subject<any>;

  constructor(url: string, method: string, options: any, subscription: Subject<any>) {
    this.url = url;
    this.method = method;
    this.options = options;
    this.subscription = subscription;
  }
}
@Injectable()
export class BackendService {
  private requests$ = new Subject<any>();
  private queue: PendingRequest[] = [];
  private webApiHttp: WebApiHttp;
  constructor(private httpClient: HttpClient) {
    this.requests$.subscribe(request => this.execute(request));
  }

  /** Call this method to add your http request to queue */
  invoke(url, method, params, options) {
    return this.addRequestToQueue(url, method, params, options);
  }

  private execute(requestData) {
    //One can enhance below method to fire post/put as well. (somehow .finally is not working for me)
    if(requestData.method == 'get'){
    const req = this.webApiHttp.Get(requestData.url)
      .then(res => {
        const sub = requestData.subscription;
        sub.next(res);
        this.queue.shift();
        this.startNextRequest();
      });
    }else if(requestData.method == 'post'){
      }else if(requestData.method == 'form_data'){

      }else if(requestData.method == 'get_file'){

      }else if(requestData.method == 'get_file_status'){

      }
  }

  private addRequestToQueue(url, method, params, options) {
    const sub = new Subject<any>();
    const request = new PendingRequest(url, method, options, sub);

    this.queue.push(request);
    if (this.queue.length === 1) {
      this.startNextRequest();
    }
    return sub;
  }

  private startNextRequest() {
    // get next request, if any.
    if (this.queue.length > 0) {
      this.execute(this.queue[0]);
    }
  }
}