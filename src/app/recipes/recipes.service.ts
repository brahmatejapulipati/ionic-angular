import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    {
      id: 'recipe1',
      title: 'Fresh Corn',
      imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/07/corn-recipes-1.jpg',
      ingredients: ['Corn','ABC','DEF']
    },
    {
      id: 'recipe2',
      title: 'Chicken Masala',
      imageUrl: 'https://static.toiimg.com/thumb/54673639.cms?imgsize=497063&width=800&height=800',
      ingredients: ['Chicken','Mustard Oil','Tomatoes']
    }
  ];

  constructor() { }

  getAllRecipies(): void {
    this.recipesChanged.next(this.recipes);
  }

  getRecipe(recipeId: string): Recipe {
    return {
      ...this.recipes.find(recipe => recipe.id === recipeId)
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    this.recipesChanged.next(this.recipes);
  }
}
