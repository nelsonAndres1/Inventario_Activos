import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { PrincipalComponent } from "./principal/principal.component";
import { Conta19Component } from "./conta19/conta19.component";
import { SobranteConta19Component } from "./sobrante-conta19/sobrante-conta19.component";
const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'principal', component: PrincipalComponent},
    {path: 'conta19', component: Conta19Component},
    {path: 'sobrante-conta19', component: SobranteConta19Component},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] =[]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)