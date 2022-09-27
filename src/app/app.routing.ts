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
const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'principal', component: PrincipalComponent},
    {path: 'conta19', component: Conta19Component},
    {path: 'sobrante-conta19', component: SobranteConta19Component},
    {path: 'reportes', component: ReportesComponent},
    {path: 'inicio-reporte', component: InicioReporteComponent},
    {path: 'opcion2', component: Opcion2Component},
    {path: 'inicio-traslado', component: InicioTrasladoComponent},
    {path: 'traslado', component: TrasladoComponent},
    {path: 'inicio-formulario', component:InicioFormularioComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'crear-periodo', component: PeriodoComponent},
    {path: 'cerrar-periodo', component: CerrarPeriodoComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] =[]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)