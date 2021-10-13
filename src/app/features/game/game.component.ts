import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { deepCopy } from '../../shared/utils/helpers';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { Game } from './models/game';


const player1AndScore: Game = {
    name: "",
    score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    scoreTotal: 0,
};

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
    dataSource: MatTableDataSource<Game> = new MatTableDataSource<Game>([deepCopy<Game>({...player1AndScore, name: "defaultName"})]);
    displayedColumns: string[] = [
        "name",
        "try1",
        "try2",
        "try3",
        "try4",
        "try5",
        "try6",
        "try7",
        "try8",
        "try9",
        "try10",
        "score",
    ];

    pinsStandUp = 10;
    historyLog: string[] = [];

    roundNumber: number = 0;
    numberAttempts: number = 0;


    constructor(
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.openDialog();
    }

    knockPins() {
        const currentGame = this.dataSource.data[0] as Game;
        let numberPinsFallen: number = this.randomPinsFallen();

        this.numberAttempts++;

        if (this.numberAttempts === 1) {
            this.historyLog.push(`===== Round ${this.roundNumber + 1} =====`);
            this.pinsStandUp -= numberPinsFallen;
            this.historyLog.push(`${numberPinsFallen} pins have fallen`);

            if (this.pinsStandUp === 0) {
                currentGame.score[this.roundNumber] = 30;
                this.numberAttempts = 0;
                this.historyLog.push("Strike !");
                this.roundNumber++;
                this.pinsStandUp = 10;
            }

        } else if (this.numberAttempts === 2) {
            numberPinsFallen = this.randomPinsFallen(this.pinsStandUp);
            this.historyLog.push(`${numberPinsFallen} pins have fallen`);
            this.pinsStandUp -= numberPinsFallen;

            if (this.pinsStandUp === 0) {
                currentGame.score[this.roundNumber] = 15;
                this.historyLog.push("Spare");
            } else {
                currentGame.score[this.roundNumber] = 0;
            }

            currentGame.scoreTotal = currentGame.score.reduce((previous, current) => previous + current, 0)

            this.numberAttempts = 0;
            this.pinsStandUp = 10;
            this.dataSource = new MatTableDataSource<Game>([currentGame]);
            this.roundNumber++;
        }

    }

    reset() {
        this.roundNumber = 0;
        this.numberAttempts = 0;
        this.pinsStandUp = 10;
        this.dataSource = new MatTableDataSource<Game>([deepCopy(player1AndScore)]);
        this.historyLog = [];
    }

    public hasPlayedTenRound() {
        return this.roundNumber === 10;
    }

    private randomPinsFallen(pinsStillStandUp: number = 10) {
        return Math.floor(Math.random() * (pinsStillStandUp + 1));
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(RegistrationDialogComponent, {
            width: `${(window.innerWidth / 4).toString()}px`,
            height: `${(window.innerWidth / 4).toString()}px`
        });


        dialogRef.afterClosed().subscribe((name: string) => {
            if (name) {
                player1AndScore.name = name;
                this.dataSource = new MatTableDataSource<Game>([deepCopy<Game>(player1AndScore)]);
            }

        });
    }
}