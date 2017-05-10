/**
 * Created by piratXus on 28.04.2017.
 */
import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal , BSModalContext  } from 'angular2-modal/plugins/bootstrap';
import { UserDialogContext, UserModal} from '../user-dialog/user-dialog'
import {AuthGuard}from '../authentication/auth.guard'
import {AdminService} from '../authentication/admin.service'
@Component({
    selector: 'user-components',
    templateUrl: './user-component.html',
    styleUrls: ['./user-style.css'],
    providers: [UserService, Modal, AuthGuard,AdminService]
})

export class UserComponent{
    showUserDetails:boolean;
    users: User[];
    blackListUser: User[];
    allUser: User[];
    selectedUser: User;
    selectUserForBlackList: User;


    constructor(private userService: UserService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
                private adminService: AdminService){
        overlay.defaultViewContainer = vcRef;
        this.showUserDetails = false;
    }

    ngOnInit(){
        console.log("ngOnInit");
        this.adminService.isAdmin();
        let bl = [];
        let us = [];
        this.showUserDetails = false;
        this.userService.getAllUsers().
            then((users:User[])=>{
            users.forEach((user)=>{
                this.userService.ExistsUser(user.id)
                    .then((resp)=>{
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
            this.userDisplay(user);
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
        console.dir(this.showUserDetails);
        this.selectUser(user);
    }

    deleteUser = () => {
        this.ngOnInit();
    }


    closeNewUser = () =>{
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
        console.dir(userId);
        this.userService.deleteUserWithlackList(userId).then(() => {
            this.ngOnInit();
        });
    }

    userDisplay(user:User){
        return this.modal.open(UserModal,  overlayConfigFactory({ selectUser: user, userList: this.allUser }, BSModalContext));
    }
}