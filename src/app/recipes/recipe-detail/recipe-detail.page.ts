import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  ionViewWillEnter() {
    this.recipeService.getAllRecipies();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  onDeleteRecipe() {
    this.alertController.create({
      header: 'Are you sure ?',
      message: 'Do you want to delete the recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.recipeService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
          }
        }
      ]
    }).then(alertEL => {
      alertEL.present();
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
