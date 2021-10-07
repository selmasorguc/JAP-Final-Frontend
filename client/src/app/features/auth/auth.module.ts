import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
    declarations: [
        LoginComponent,
        UserProfileComponent,
        AdminAreaComponent
    ],
    imports: [
        SharedModule,
        PaginationModule
    ],
    exports: [
        LoginComponent,
        UserProfileComponent,
        AdminAreaComponent
    ]
})
export class AuthModule { }
