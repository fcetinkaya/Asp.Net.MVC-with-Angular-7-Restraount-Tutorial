import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from "src/app/shared/order-item.model";
import { ItemService } from "src/app/shared/item.service";
import { Item } from "src/app/shared/item.model";
import { NgForm } from "@angular/forms";
import { OrderService } from "src/app/shared/order.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order-items",
  templateUrl: "./order-items.component.html",
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[]; // Item Model
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    // Dialog Popup Open
    public dialogRef: MatDialogRef<
      OrderItemsComponent
    > /* Servis from get api List...*/,
    private itemService: ItemService /*ItemService*/,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.itemService.getItemList().then(res => (this.itemList = res as Item[]));
    if (this.data.OrderItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: "",
        Price: 0,
        Quantily: 0,
        Total: 0
      };
    else {
      this.formData = Object.assign(
        {},
        this.orderService.orderItems[this.data.OrderItemIndex]
      );
    }
  }

  updatePrice(ctrl) {
    this.toastr.info("Seçildi", ctrl.value + "-" + ctrl.selectedIndex);
    if ((ctrl.selectedIndex = 0)) {
      this.formData.Price = 0;
      this.formData.ItemName = "";
    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
    }
  }
  updateTotal() {
    this.formData.Total = 545;
    this.formData.Total = parseFloat(
      (this.formData.Quantily * this.formData.Price).toFixed(2)
    );
  }
  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.OrderItemIndex == null)
        this.orderService.orderItems.push(form.value);
      else this.orderService.orderItems[this.data.OrderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0) this.isValid = false;
    else if (formData.Quantily == 0) this.isValid = false;
    return this.isValid;
  }

  close() {
    this.dialogRef.close();
  }
}
