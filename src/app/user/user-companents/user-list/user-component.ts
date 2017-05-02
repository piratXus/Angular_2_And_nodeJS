/**
 * Created by piratXus on 28.04.2017.
 */
import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'user-components',
    templateUrl: './user-component.html',
    styleUrls: ['./user-style.css'],
    providers: [UserService]
})

export class UserComponent{
    showDialog:boolean;
    users: User[];
    blackListUser: User[];
    allUser: User[];
    selectedUser: User;
    selectUserForBlackList: User;

    constructor(private userService: UserService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal){
        overlay.defaultViewContainer = vcRef;
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
            this.allUser = users;
        });
    }

    private getIndexOfUser = (userId: number) => {
        return this.users.findIndex((user) => {
            return user.id === userId;
        });
    }

    onClick(user:User) {
        this.selectUser(user);
        if(this.blackListUser.indexOf(user)==0){
            this.modal.alert()
                .showClose(true)
                .title('User details')
                .body('<div><label>User is banned</label></div>')
                .open();
        }else{
            this.modal.alert()
                .showClose(true)
                .title('User details')
                .body('<div><label>Name:'+this.selectedUser.name+'</label></div><div><label>Surname:'+this.selectedUser.surname+'</label></div> <div> input<input name="user-name" placeholder="Name"/></div>>')
                .open();
        }

    }


    selectUser(user: User) {
        this.selectedUser = user;
        this.selectUserForBlackList = user;
    }

    createNewUser() {
        console.log("create new User")
        var user: User = {
            login:'',
            name: '',
            surname:''
        };

        this.selectUser(user);
    }

    deleteUser = () => {
        this.ngOnInit();
    }

    addUser = () => {
        this.ngOnInit();
    }

    updateUser = () => {
        this.ngOnInit();
    }

    addUserInBlackList(user:User) {
        this.selectUserForBlackList = user;
        this.userService.addUserInBlackList(this.selectUserForBlackList).then(() => {
            this.ngOnInit();
        });
    }

    deleteUserWithBlackList(userId: number): void {
        this.userService.deleteUserWithlackList(userId).then(() => {
            this.ngOnInit();
        });
    }
}