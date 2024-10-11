import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iauto } from '../../model/iauto';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandName: string | undefined;
  carArr: Iauto[] = [];
  filteredCars: Iauto[] = [];
  brandLogos: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.brandName = params['name'];
      fetch('db.json')
        .then((res) => res.json())
        .then((res) => {
          this.carArr = res;
          this.filteredCars = this.carArr.filter(
            (car) => car.brand.toLowerCase() === this.brandName?.toLowerCase()
          );
          this.filteredCars.forEach((car) => {
            this.brandLogos[car.brand] = car.brandLogo;
          });
        })
        .catch((error) =>
          console.error('Errore nel caricamento di db.json', error)
        );
    });
  }
}
