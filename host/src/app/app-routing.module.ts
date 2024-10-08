import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'remote',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://ionic-module-federation.vercel.app/remoteEntry.js',
        exposedModule: './Module',
      }).then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'remote',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
