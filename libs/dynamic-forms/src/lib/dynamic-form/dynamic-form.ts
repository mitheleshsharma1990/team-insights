import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldConfig } from '../dynamic-form.interface';

@Component({
  selector: 'lib-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.css'],
  standalone: true,
})
export class DynamicForm implements OnInit {
  constructor() {}

  @Input() config: FormFieldConfig[] = [];
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.config.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = new FormControl(field.value || '', validators);
    });
    this.form = new FormGroup(group);
  }
  onSubmit() {
    console.log('Submitting form', this.form.value);
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  resetForm() {
    this.form.reset();
  }
}
