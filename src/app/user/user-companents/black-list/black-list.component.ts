/**
 * Created by emergency on 5/4/2017.
 */
import {Component} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { BlackList } from '../../blacklist'

@Component({
    selector: 'black-list',
    templateUrl: './black-list.html',
    styleUrls: ['../user-list/user-style.css'],
    providers: [UserService]
})


export class BlackListComponent{
    users: User[];
    blackListUser: BlackList[];
    selectedUser: User;
    valueSwitch: boolean;


    constructor(private userService: UserService){
        this.valueSwitch = false;
    }

    ngOnInit(){
        let bl = []
        let status = false;
        this.userService.getAllUsers().
        then((users:User[])=>{
            users.forEach((user)=>{
                this.userService.ExistsUser(user.id)
                    .then((resp)=>{
                        let blackUser = new BlackList();
                        if(resp[0].count>0){
                            status = true;
                            blackUser.user = user;
                            blackUser.status = status;
                            bl.push(blackUser);
                            console.log("is banned");
                            console.dir(bl);
                        }else {
                           status = false;
                            blackUser.user = user;
                            blackUser.status = status;
                            bl.push(blackUser);
                            console.log("no banned")
                            console.dir(bl)
                        };

                });
                this.blackListUser = bl;
            });
            console.dir(this.blackListUser);
        });
    }

    private getIndexOfUser = (userId: number) => {
        return this.users.findIndex((user) => {
            return user.id === userId;
        });
    }

    switchOptions(user: BlackList){
        console.dir(user);

        if(user.status){
            console.log("deleted");
            this.deleteUserWithBlackList(user.user.id);
            user.status = !user.status;
        }else {
            this.addUserInBlackList(user.user);
            user.status = !user.status;
        }
    }

    addUserInBlackList(user: User) {
            this.userService.addUserInBlackList(user).then(() => {
                this.ngOnInit();
            });

    }

    deleteUserWithBlackList(userId: number): void {
        console.dir(userId);
        this.userService.deleteUserWithlackList(userId).then(() => {
            this.ngOnInit();
        });
    }

}
