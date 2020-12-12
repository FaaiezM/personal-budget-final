import { Component, OnInit } from '@angular/core';
import { AnnualSavingsService } from 'src/app/services/annual-savings.service';
import AnnualSavings from '../models/annual-savings';

@Component({
  selector: 'pb-add-annual-savings',
  templateUrl: './add-annual-savings.component.html',
  styleUrls: ['./add-annual-savings.component.scss']
})
export class AddAnnualSavingsComponent implements OnInit {

  annualSavings: AnnualSavings = new AnnualSavings();
  submitted = false;

  constructor(private annualSavingsService: AnnualSavingsService) { }

  ngOnInit(): void {
  }

  saveAnnualSavings(): void {
    this.annualSavingsService.create(this.annualSavings).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newAnnualSavings(): void {
    this.submitted = false;
    this.annualSavings = new AnnualSavings();
  }

}
