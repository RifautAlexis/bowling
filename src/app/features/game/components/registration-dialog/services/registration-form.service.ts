import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class RegistrationFormService {

    private registrationFormGroup!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
    ) { }

    public initForm(): void {
        this.registrationFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    public getRegistrationFormGroup(): FormGroup {
        return <FormGroup>this.registrationFormGroup;
      }
    
}