import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationFormService } from './services/registration-form.service';

@Component({
    selector: 'registration-dialog',
    templateUrl: 'registration-dialog.component.html'
})
export class RegistrationDialogComponent implements OnInit {
    
    public registrationFormGroup!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<RegistrationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly registrationFormService: RegistrationFormService,
    ) { }

    ngOnInit() {
        this.registrationFormService.initForm();
        this.registrationFormGroup = this.registrationFormService.getRegistrationFormGroup();
    }

    public register() {
        this.dialogRef.close(this.registrationFormGroup!.get('name')!.value);
    }
    
}