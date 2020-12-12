import { Component, OnInit } from '@angular/core';
import { AnnualSavingsService } from 'src/app/services/annual-savings.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pb-annual-savings-list',
  templateUrl: './annual-savings-list.component.html',
  styleUrls: ['./annual-savings-list.component.scss']
})
export class AnnualSavingsListComponent implements OnInit {

  annualSavings: any;
  currentSavings = null;
  currentIndex = -1;
  title = '';

  constructor(private annualSavingsService: AnnualSavingsService) { }

  ngOnInit(): void {
    this.retrieveAnnualSavings();
  }

  refreshList(): void {
    this.currentSavings = null;
    this.currentIndex = -1;
    this.retrieveAnnualSavings();
  }

  retrieveAnnualSavings(): void {
    this.annualSavingsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.annualSavings = data;
    });
  }

  setActiveAnnualSavings(annualSaving, index): void {
    this.currentSavings = annualSaving;
    this.currentIndex = index;
  }

  removeAllAnnualSavings(): void {
    this.annualSavingsService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
