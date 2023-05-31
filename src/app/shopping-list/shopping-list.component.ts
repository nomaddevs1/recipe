import { Component } from '@angular/core';
import Ingredient from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Array<Ingredient> = [
    new Ingredient('tomato', 5),
    new Ingredient('cucumber', 15),
    new Ingredient('pepper', 2),
    new Ingredient('onion', 3),
    new Ingredient('garlic', 4),
  ];
  createIngredient(ingredient) {
    this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  }
}
