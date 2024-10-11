import { Component, OnInit } from '@angular/core';
import { Iauto } from '../../model/iauto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  autoArr: Iauto[] = [];
  brandArr: string[] = [];
  randomCars: Iauto[] = [];
  brandLogos: any = {};

  constructor() {}

  ngOnInit(): void {
    fetch('db.json')
      .then((res) => res.json())
      .then((res) => {
        this.autoArr = res;
        this.brandArr = this.autoArr.map((auto) => auto.brand);
        this.brandArr = Array.from(new Set(this.brandArr));
        this.brandArr.forEach((brand) => {
          const car = this.autoArr.find((auto) => auto.brand === brand);
          if (car) {
            this.brandLogos[brand] = car.brandLogo;
          }
        });
        const availableCars = this.autoArr.filter((auto) => auto.available);
        this.randomCars = this.getRandomCars(availableCars, 3);
      })
      .catch((error) =>
        console.error('Errore nel caricamento di db.json', error)
      );
  }

  getRandomCars(cars: Iauto[], count: number): Iauto[] {
    const shuffled = [...cars].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
