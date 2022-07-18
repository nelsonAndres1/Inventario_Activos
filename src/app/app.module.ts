import { NgModule } from '@angular/core';
import { routing,appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { PrincipalComponent } from './principal/principal.component';
import { Conta19Component } from './conta19/conta19.component';
import { SobranteConta19Component } from './sobrante-conta19/sobrante-conta19.component';
import { ReportesComponent } from './reportes/reportes.component';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';


// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import { InicioReporteComponent } from './inicio-reporte/inicio-reporte.component';
import { Opcion2Component } from './opcion2/opcion2.component';
import { InicioTrasladoComponent } from './inicio-traslado/inicio-traslado.component';
import { TrasladoComponent } from './traslado/traslado.component';
import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PrincipalComponent,
    Conta19Component,
    SobranteConta19Component,
    ReportesComponent,
    InicioReporteComponent,
    Opcion2Component,
    InicioTrasladoComponent,
    TrasladoComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BoldReportViewerModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
