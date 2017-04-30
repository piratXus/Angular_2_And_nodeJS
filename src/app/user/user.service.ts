/**
 * Created by piratXus on 28.04.2017.
 */
import { Injectable } from '@angular/core';
import { User } from './user';
import {BlackList} from './blackList';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{
    private url = "http://localhost:3000/api/user";
    private usrBlackList = "http://localhost:3000/api/blacklist";

    constructor(private http: Http){};

    getAllUsers(): Promise<User[]>{
        return this.http.get(this.url).toPromise().
        then(response => response.json() as User[]).
        catch(this.handleError);
    }

    createUser(newUser: User): Promise<User> {
        return this.http.post(this.url, newUser)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    };

    deleteUser(idUser:number): Promise<number>{
        return this.http.delete(this.url+'/'+idUser).toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    updateUser(putUser: User): Promise<User> {
        return this.http.put(this.url+"/"+putUser.id, putUser)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    ExistsUser(idUser: number): Promise< number >{
        return this.http.get(this.usrBlackList+'/'+idUser).toPromise()
            .then(resp => resp.json())
            .catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}