import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { OrderItem } from "./order-item.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];

  constructor(private http:HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
   return this.http.post(environment.apiURL + "/Order", body);
  }

  getOrderList(){
    return this.http.get(environment.apiURL+'/Orders').toPromise(); // Add Code..VS Code address
   }

   getOrderByID(id:number):any {
    return this.http.get(environment.apiURL+'/Orders/'+id).toPromise(); // Add Code..VS Code address
   }

   deleteOrder(id:number) {
    return this.http.delete(environment.apiURL+'/Orders/'+id).toPromise(); // Add Code..VS Code address
   }
}
