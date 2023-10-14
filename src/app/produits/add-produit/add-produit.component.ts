import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  constructor() { }


  addProduitForm = new FormGroup({
    name:new FormControl(),
    quantity:new FormControl(),
    price: new FormControl()
  })

  ngOnInit(): void {
  }

  saveProduct():void{
    console.log(this.addProduitForm.value)
  }
}
