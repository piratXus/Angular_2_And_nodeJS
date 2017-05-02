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
    showUserDetails:boolean;
    users: User[];
    blackListUser: User[];
    allUser: User[];
    selectedUser: User;
    selectUserForBlackList: User;

    constructor(private userService: UserService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal){
        overlay.defaultViewContainer = vcRef;
        this.showUserDetails = false;
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
        if(this.blackListUser.indexOf(user)<0){
            this.modal.alert()
                .showClose(true)
                .title('User details')
                .body('<div><label>Name:'+this.selectedUser.name+'</label></div><div><label>Surname:'+this.selectedUser.surname+'</l;6abel></div>')
                .open();
        }else{
            this.modal.alert()
                .showClose(true)
                .title('User details')
                .body('<div><label>User is banned</label></div>')
                .open();
        }

    }


    selectUser(user: User) {
        this.selectedUser = user;
        this.selectUserForBlackList = user;
    }

    editUser(user:User){
        console.dir(user);
        console.dir(this.showUserDetails);
        this.showUserDetails = true;
        console.dir(this.showUserDetails);
        this.selectUser(user);
    }

    createNewUser() {
        this.showUserDetails = true;
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
        if(this.blackListUser.indexOf(user)<0){
            this.userService.addUserInBlackList(user).then(() => {
                this.ngOnInit();
            });
        }else {
            this.modal.alert()
                .showClose(true)
                .title('User details')
                .body('<div><label>This is user is banned</label></div>')
                .open();
        }

    }

    deleteUserWithBlackList(userId: number): void {
        this.userService.deleteUserWithlackList(userId).then(() => {
            this.ngOnInit();
        });
    }
}