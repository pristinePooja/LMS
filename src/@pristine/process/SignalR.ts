import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {receiverData, ReceiveResponseMessageModel, receiverNotification} from "../../app/model/SignalRModel";

@Injectable({
  providedIn: 'root'
})
export class SignalR {
  private hubConnection: HubConnection;

  constructor() {

  }

  // start the connection for whole app
  public startConnection = (emailid: string, url: string) => {
    if(this.hubConnection==null && this.hubConnection==undefined){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(url + '?email=' + emailid).withAutomaticReconnect().configureLogging(LogLevel.Information).build();

    // web  start connection
    this.hubConnection
      .start()
      .then(() => {
        //console.log('Connection started');
        this.receiveDataFromServerListener();
      }, error => {
        console.log(error);
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err)
      });
    // call this method when  web shoket going to close connection
    this.hubConnection.onclose(error => {
      console.log(error);
    });
    }
  };
  public  receiveDataFromServerListener = () => {
    this.hubConnection.on('notification', (data: ReceiveResponseMessageModel) => {
      receiverData.next(data);
      // console.log(data);
    });
    this.hubConnection.on('logoutAllDevices', (data: ReceiveResponseMessageModel) => {
      // console.log(data);
      receiverData.next(data);
      // console.log(data);
    });
    this.hubConnection.on('adjustmentNotification', (data: ReceiveResponseMessageModel) => {
      // console.log(data);
      this.Notification_Show_OnBrowser(data.action,data.message);
     receiverNotification.next(data);
    });
  };


  public stopSignalRConnection=()=>{
    this.hubConnection.stop();
  }


  Notification_Show_OnBrowser(title,text){
    this.askNotificationPermission();
    var img = 'assets/images/logos/mylogo.png';
    var notification = new Notification(title, { body: text, icon: img });
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        // The tab has become visible so clear the now-stale Notification.
        notification.close();
      }
    });
  }

  askNotificationPermission() {
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
    } else {
      if(this.checkNotificationPromise()) {
        Notification.requestPermission()
          .then((permission) => {
            // handlePermission(permission);
          })
      } else {
        Notification.requestPermission(function(permission) {
          //  handlePermission(permission);
        });
      }
    }
  }
  checkNotificationPromise():boolean {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }
}
