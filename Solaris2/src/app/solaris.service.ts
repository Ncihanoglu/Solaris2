import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SolarisService {

  constructor(private http: Http) {}
    public getJSON(): Observable<any> {
         return this.http.get("../src/app/solaris-2.json")
                         .map(res => {
                            return res.json()
                          })
     }

}