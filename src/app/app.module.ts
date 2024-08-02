import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';// Importar o HeaderComponent
import { TodoModule } from './todo/todo.module'; // Importar o módulo Todo se ele estiver em um módulo separado

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent // Declarar o HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]), // Certifique-se de que o RouterModule está configurado
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TodoModule // Importar o módulo Todo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
