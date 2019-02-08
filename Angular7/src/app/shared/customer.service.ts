import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerList(){
    return this.http.get(environment.apiURL+'/Customer').toPromise(); // Add Code..VS Code address
   }
}
