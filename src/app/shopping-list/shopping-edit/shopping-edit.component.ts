import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: FormGroup;
  editMode = false;
  index: number;
  editedItem: Ingredient;
  item = {
    name: '',
    amount: 0,
  };
  subscription: Subscription;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.statedEditing.subscribe((item) => {
      this.index = item;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(this.index);
      this.form.setValue({
        name: this.editedItem.name,
        amountInput: this.editedItem.amount,
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get f() {
    return this.form.controls.amountInput.errors;
  }
  onDelete() {
    this.slService.deleteIngredient(this.index);
    this.editMode = false;
  }
  onAddItem() {
    let ingredient = new Ingredient(
      this.form.value.name,
      this.form.value.amountInput
    );
    if (this.editMode) {
      this.slService.updateIngredients(this.index, ingredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.form.reset();
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
  }
}
