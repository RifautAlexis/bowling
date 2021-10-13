import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
    imports: [
        SharedModule,
        GameRoutingModule,
    ],
    declarations: [
        GameComponent,
        RegistrationDialogComponent,
    ],
})
export class GameModule { }
