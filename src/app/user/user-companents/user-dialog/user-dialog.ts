import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {User} from "../../user";
import {UserService} from '../../user.service'


export class UserDialogContext extends BSModalContext {
    public selectUser: User;
    public userList: User[];

}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'modal-content',
    templateUrl: "./user-dialog.component.html",
    providers: [UserService]
})
export class UserModal implements CloseGuard, ModalComponent<UserDialogContext> {
    context: UserDialogContext;

    public showWindiow: boolean;

    constructor(public dialog: DialogRef<UserDialogContext>, private userService:UserService) {
        this.context = dialog.context;
        console.dir(this.context.userList);
        console.dir(this.context.selectUser);

        this.showWindiow = true;
        dialog.setCloseGuard(this);
    }

    onKeyUp() {
        this.showWindiow = false;
        this.dialog.close();
    }


    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.showWindiow;
    }

    updateUser(user:User): void {

        this.userService.updateUser(user).then(() => {
            this.onKeyUp();
        });
    }

    deleteUser(user: User): void {
        this.userService.deleteUser(user.id).then(() => {
            this.context.userList.splice(this.context.userList.indexOf(user),1);
        this.onKeyUp();
        });

    }

    submitted = false;
    onSubmit():void{
        this.submitted = true;
    }
}
