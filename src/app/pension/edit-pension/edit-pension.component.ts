import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-pension',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-pension.component.html',
  styleUrls: ['./edit-pension.component.css']
})
export class EditPensionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
