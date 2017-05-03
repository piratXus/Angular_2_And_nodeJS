import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {User} from "../../user";


export class UserDialogContext extends BSModalContext {
    public selectUser: User;

}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'modal-content',
    templateUrl: "./user-dialog.component.html"
})
export class UserModal implements CloseGuard, ModalComponent<UserDialogContext> {
    context: UserDialogContext;

    public wrongAnswer: boolean;

    constructor(public dialog: DialogRef<UserDialogContext>) {
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    onKeyUp(value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    }


    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.wrongAnswer;
    }
}
