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
      'A dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients',
      'https://media.fshoq.com/images/316/pizza-with-vegetables-on-a-wooden-table-316-small.jpg',
      [
        new Ingredient('Cheese', 5),
        new Ingredient('Tomatoes', 3),
        new Ingredient('Wheat', 2.5),
      ]
    ),
    new Recipe(
      'Hamburger',
      'A hamburger is a food, typically considered a sandwich, consisting of one or more cooked patties, usually ground meat, typically beef placed inside a sliced bread roll or bun',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6qK8Adcg2la_JP1YASlAkAHaEK%26pid%3DApi&f=1',
      [
        new Ingredient('Cheese', 2),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Ground meat', 1),
        new Ingredient('Lettuce', 2),
        new Ingredient('Bread', 2),
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
