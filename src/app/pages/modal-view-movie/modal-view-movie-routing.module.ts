import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalViewMoviePage } from './modal-view-movie.page';

const routes: Routes = [
  {
    path: '',
    component: ModalViewMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalViewMoviePageRoutingModule {}
