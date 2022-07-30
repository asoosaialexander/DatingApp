import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  url = 'https://localhost:5001/api/';
  validationErrors: string[]=[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  get400Error() {
    this.httpClient.get(this.url + 'buggy/bad-request').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  get401Error() {
    this.httpClient.get(this.url + 'buggy/auth').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  get404Error() {
    this.httpClient.get(this.url + 'buggy/not-found').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  get500Error() {
    this.httpClient.get(this.url + 'buggy/server-error').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  get400ValidationError() {
    this.httpClient.post(this.url + 'account/register', {}).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    );
  }
}
