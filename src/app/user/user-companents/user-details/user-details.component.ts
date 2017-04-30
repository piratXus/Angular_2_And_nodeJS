/**
 * Created by piratXus on 29.04.2017.
 */
import { Component, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details-style.css']
})

export class UserDetailsComponent {
    @Input()
    user: User;

    @Input()
    createHandler: Function;

    @Input()
    deleteHandler: Function;

    @Input()
    updateHandler: Function;

    constructor (private userService: UserService) {}

    createUser(user: User) {
        console.log("user-details");
        console.dir(user);

        this.userService.createUser(user).then(() => {
            this.createHandler();
        });
        this.user = null;
    }
    deleteUser(userId: number): void {
        this.userService.deleteUser(userId).then((deletedUserId: number) => {
            this.deleteHandler(deletedUserId);
        });
        this.user = null;
    }

    updateUser(user: User): void {
        this.userService.updateUser(user).then((updatedUser: User) => {
            this.updateHandler(updatedUser);
        });
        this.user = null;
    }
}
