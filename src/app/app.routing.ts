import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { PrincipalComponent } from "./principal/principal.component";
import { Conta19Component } from "./conta19/conta19.component";
import { SobranteConta19Component } from "./sobrante-conta19/sobrante-conta19.component";
import { ReportesComponent } from "./reportes/reportes.component";
import { InicioReporteComponent } from "./inicio-reporte/inicio-reporte.component";
import { Opcion2Component } from "./opcion2/opcion2.component";
import { InicioTrasladoComponent } from "./inicio-traslado/inicio-traslado.component";
import { TrasladoComponent } from "./traslado/traslado.component";
import { FormularioComponent } from "./formulario/formulario.component";
import { InicioFormularioComponent } from "./inicio-formulario/inicio-formulario.component";
import { PeriodoComponent } from "./periodo/periodo.component";
import { CerrarPeriodoComponent } from "./cerrar-periodo/cerrar-periodo.component";
import { ReporteGeneralComponent } from "./reporte-general/reporte-general.component";
import { ReporteGeneralPDFComponent } from "./reporte-general-pdf/reporte-general-pdf.component";
import { HomeComponent } from "./home/home.component";
import { IdentityGuard } from "./services/identity.guard";
import { LoginGuard } from "./services/login.guard";

const appRoutes: Routes = [
    {path: '', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'logout/:sure', component:LoginComponent, canActivate: [IdentityGuard]},
    {path: 'principal', component: PrincipalComponent , canActivate: [IdentityGuard]},
    {path: 'conta19', component: Conta19Component, canActivate: [IdentityGuard]},
    {path: 'sobrante-conta19', component: SobranteConta19Component, canActivate: [IdentityGuard]},
    {path: 'reportes', component: ReportesComponent, canActivate: [IdentityGuard]},
    {path: 'inicio-reporte', component: InicioReporteComponent, canActivate: [IdentityGuard]},
    {path: 'opcion2', component: Opcion2Component, canActivate: [IdentityGuard]},
    {path: 'inicio-traslado', component: InicioTrasladoComponent, canActivate: [IdentityGuard]},
    {path: 'traslado', component: TrasladoComponent, canActivate: [IdentityGuard]},
    {path: 'inicio-formulario', component:InicioFormularioComponent, canActivate: [IdentityGuard]},
    {path: 'formulario', component: FormularioComponent, canActivate: [IdentityGuard]},
    {path: 'crear-periodo', component: PeriodoComponent, canActivate: [IdentityGuard]},
    {path: 'cerrar-periodo', component: CerrarPeriodoComponent, canActivate: [IdentityGuard]},
    {path: 'reporte-general', component: ReporteGeneralComponent, canActivate: [IdentityGuard]},
    {path: 'reporte-general-pdf', component: ReporteGeneralPDFComponent, canActivate: [IdentityGuard]},
    {path: 'home', component: HomeComponent, canActivate: [IdentityGuard]},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] =[]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)