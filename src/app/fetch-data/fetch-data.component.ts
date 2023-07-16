import {DOCUMENT} from "@angular/common";
import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent {
  data: any[] = []; // The array to store the fetched data
  isLoading: boolean = false; // Flag to prevent multiple API calls at once
  name = 'Angular';
  scrollTop!: number;
  constructor(
    @Inject(DOCUMENT) private document: Document,

  ) {}
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.fetchData();
    }
  @HostListener('window:scroll', ['$event'])
  onScroll(e:any) {
    let index=1;
          console.log('adasdasd', this.isScrollAtBottom());
          if (this.isLoading && this.isScrollAtBottom()) {

            fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(json =>
        {
          this.data = json.slice(10,20);
          console.log('index', index);

          console.log('plus', this.data)
        })

          }   else if (this.scrollTop === 0) {
            console.log('index', index)
            console.log('az sam 9');
            fetch(`https://jsonplaceholder.typicode.com/posts/${index--}/comments`)
            .then(response => response.json())
            .then(json =>
              {
                this.data = json;
                console.log('index', index);
                console.log('plus', this.data)
              })
          }
  }

  isScrollAtBottom(): boolean {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
     this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;



    return this.scrollTop >= documentHeight - windowHeight;
  }

    fetchData(): void {
      this.isLoading = true;
      let index=1;
      fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(json =>
        {
          this.data = json.slice(0,10);
          console.log(this.data.slice(0,10))
        })
      // Call your API to fetch more data
      // Add the fetched data to the existing data array

      // Simulating an API call with a delay



    }

}
