/**
 * Created by piratXus on 28.04.2017.
 */
import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{
    private url = "http://localhost:3000/api/user";

    constructor(private http: Http){};

    getAllUsers(): Promise<User[]>{
        return this.http.get(this.url).toPromise().
        then(response => response.json() as User[]).
        catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}