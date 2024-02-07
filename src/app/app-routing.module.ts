import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { StudentModule } from './student/student.module';
import { AdminsModule } from './admins/admins.module';
import { TeacherModule } from './teacher/teacher.module';
import { PensionModule } from './pension/pension.module';
import { AnneeAcademiqueModule } from './annee-academique/annee-academique.module';
import { EmploiDuTempsModule } from './emploi-du-temps/emploi-du-temps.module';
import { ClasseModule } from './classe/classe.module';
import { FiliereModule } from './filiere/filiere.module';
import { OptionModule } from './option/option.module';
import { MatiereModule } from './matiere/matiere.module';
import { LemploiModule } from './lemploi/lemploi.module';
import { GuardService as Guard } from './services/guard/guard.service';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { TarifModule } from './tarif/tarif.module';
import { PageEditComponent } from './pages/page-edit/page-edit.component';

const routes: Routes = [
  {
    path: '', canActivate: [Guard], children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-profile', component: UsersProfileComponent },
      { path: 'student', loadChildren: () => StudentModule },
      { path: 'admins', loadChildren: () => AdminsModule },
      { path: 'teacher', loadChildren: () => TeacherModule },
      { path: 'pension', loadChildren: () => PensionModule },
      { path: 'anneeAcademique', loadChildren: () => AnneeAcademiqueModule },
      { path: 'emploiDuTemps', loadChildren: () => EmploiDuTempsModule },
      { path: 'classe', loadChildren: () => ClasseModule },
      { path: 'filiere', loadChildren: () => FiliereModule },
      { path: 'option', loadChildren: () => OptionModule },
      { path: 'matiere', loadChildren: () => MatiereModule },
      { path: 'lemploi', loadChildren: () => LemploiModule },
      { path: 'tarif', loadChildren: () => TarifModule },
      { path: 'page-edit', component: PageEditComponent }
    ]
  },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: '**', redirectTo: '/pages-error404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
