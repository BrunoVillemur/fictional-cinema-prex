import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'modal-forgot-pass',
    loadChildren: () => import('./pages/modal-forgot-pass/modal-forgot-pass.module').then( m => m.ModalForgotPassPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'modal-add-movie',
    loadChildren: () => import('./pages/modal-add-movie/modal-add-movie.module').then( m => m.ModalAddMoviePageModule)
  },
  {
    path: 'modal-view-movie',
    loadChildren: () => import('./pages/modal-view-movie/modal-view-movie.module').then( m => m.ModalViewMoviePageModule)
  },  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
