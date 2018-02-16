import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-coordinate',
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.css']
})
export class CoordinateComponent implements OnInit {
  coordinates: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://35.204.150.105/api/values').subscribe(response => {
      this.coordinates = response.json();
      console.log(this.coordinates);
    });
  }

}
