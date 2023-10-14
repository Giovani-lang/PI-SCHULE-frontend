import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {
  editProductForm = new FormGroup({
    name:new FormControl(),
    quantity:new FormControl(),
    price: new FormControl()
  })
  constructor() { }

  ngOnInit(): void {
  }

  editProduct():void{
    console.log(this.editProductForm.value)
  }

}
