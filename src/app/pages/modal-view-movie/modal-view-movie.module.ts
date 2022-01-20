import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalViewMoviePageRoutingModule } from './modal-view-movie-routing.module';

import { ModalViewMoviePage } from './modal-view-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalViewMoviePageRoutingModule
  ],
  declarations: [ModalViewMoviePage]
})
export class ModalViewMoviePageModule {}
