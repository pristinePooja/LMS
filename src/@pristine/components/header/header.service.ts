import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from './header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  switchView : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
