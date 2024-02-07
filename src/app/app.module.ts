import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './student/student.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat'
import { AdminsModule } from './admins/admins.module';
import { TeacherModule } from './teacher/teacher.module';
import { PensionModule } from './pension/pension.module';
import { AnneeAcademiqueModule } from './annee-academique/annee-academique.module';
import { EmploiDuTempsModule } from './emploi-du-temps/emploi-du-temps.module';
import { FiliereModule } from './filiere/filiere.module';
import { MatiereModule } from './matiere/matiere.module';
import { OptionModule } from './option/option.module';
import { ClasseModule } from './classe/classe.module';
import { LemploiModule } from './lemploi/lemploi.module';
import { TarifModule } from './tarif/tarif.module';
import { PageEditComponent } from './pages/page-edit/page-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesError404Component,
    PagesBlankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    TeacherModule,
    StudentModule,
    AdminsModule,
    FiliereModule,
    TarifModule,
    PageEditComponent,
    MatiereModule,
    OptionModule,
    ClasseModule,
    EmploiDuTempsModule,
    AnneeAcademiqueModule,
    PagesLoginComponent,
    PensionModule,
    LemploiModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAHjUh2_4zARaow8MqdjxKHqlXIkrknZ8s",
      authDomain: "pi-schule.firebaseapp.com",
      projectId: "pi-schule",
      storageBucket: "pi-schule.appspot.com",
      messagingSenderId: "1018655698680",
      appId: "1:1018655698680:web:38d845248a59992826d50d"
    })
    ,
    AngularFireStorageModule,
    UsersProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
