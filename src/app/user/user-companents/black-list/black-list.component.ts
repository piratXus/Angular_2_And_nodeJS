/**
 * Created by emergency on 5/4/2017.
 */
import {Component} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
    selector: 'black-list',
    templateUrl: './black-list.html',
    styleUrls: ['../user-list/user-style.css'],
    providers: [UserService]
})

export class BlackListComponent{
    users: User[];
    blackListUser: User[];
    selectedUser: User;
    selectUserForBlackList: User;


    constructor(private userService: UserService){

    }

    ngOnInit(){
        let bl = [];
        let us = [];
        this.userService.getAllUsers().
        then((users:User[])=>{
            users.forEach((user)=>{
                this.userService.ExistsUser(user.id)
                    .then((resp)=>{
                        console.dir();
                        if(resp[0].count>0){
                            bl.push(user);
                        }else {
                            us.push(user);
                        };
                    });
                this.blackListUser = bl;
                this.users = us;
            });
        });
    }

    private getIndexOfUser = (userId: number) => {
        return this.users.findIndex((user) => {
            return user.id === userId;
        });
    }


    selectUser(user: User) {
        this.selectedUser = user;
        this.selectUserForBlackList = user;
    }


    deleteUserWithBlackList(userId: number): void {
        console.dir(userId);
        this.userService.deleteUserWithlackList(userId).then(() => {
            this.ngOnInit();
        });
    }

}
