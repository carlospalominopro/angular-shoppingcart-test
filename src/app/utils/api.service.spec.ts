import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpCtrl: HttpTestingController;  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('Should return users from Http Get call.', () => {
    service.authLogin()
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
        },
        error: (err) => {
          expect(err).toBeTruthy();
        },
      });

    const mockHttp = httpCtrl.expectOne(service.API + '/users');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

  });

});
