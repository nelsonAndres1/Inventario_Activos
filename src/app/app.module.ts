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

// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';

// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import { InicioReporteComponent } from './inicio-reporte/inicio-reporte.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PrincipalComponent,
    Conta19Component,
    SobranteConta19Component,
    ReportesComponent,
    InicioReporteComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BoldReportViewerModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }