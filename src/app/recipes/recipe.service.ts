import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Some tasty shit',
      'https://media.fshoq.com/images/316/pizza-with-vegetables-on-a-wooden-table-316-small.jpg',
      [
        new Ingredient('Cheese', 5),
        new Ingredient('Tomatoes', 3),
        new Ingredient('Wheat', 2.5),
      ]
    ),
    new Recipe(
      'Pizza again',
      'Still damn tasty',
      'https://media.fshoq.com/images/316/pizza-with-vegetables-on-a-wooden-table-316-small.jpg',
      [
        new Ingredient('Cheese', 4),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Wheat', 2),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
