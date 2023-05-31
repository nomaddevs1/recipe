import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  //? recipe to be send to the recipe detail component whenever we receive the recipe from recipe item
  @Output('recipeDetail') recipeDetail = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Pasta is a delicious pasta',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1615916524567.jpeg'
    ),
    new Recipe(
      'Burger',
      'Burger is a delicious burger',
      'https://assets.bonappetit.com/photos/57aceacc1b3340441497532d/1:1/w_960,c_limit/double-rl-ranch-burger.jpg'
    ),
  ];
  constructor() {}
  selectedRecipe(recipe: Recipe): void {
    this.recipeDetail.emit(recipe);
  }
}
