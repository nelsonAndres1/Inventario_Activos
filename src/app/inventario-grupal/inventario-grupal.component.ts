import { Component, OnChanges, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Conta19Service } from '../services/conta19.service';
import { Gener02 } from '../models/gener02';
import { Conta19_Copia } from '../models/conta19_copia';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Conta19 } from '../models/conta19';
import { delay, identity } from 'rxjs';
import { Conta124 } from '../models/conta124';
import { Conta123 } from '../models/conta123';

@Component({
  selector: 'app-inventario-grupal',
  templateUrl: './inventario-grupal.component.html',
  styleUrls: ['./inventario-grupal.component.css'],
  providers: [Conta19Service]
})

export class InventarioGrupalComponent implements OnInit {
  filterPost = '';
  public token: any;
  public longi: any;
  public encargado: any;
  public usuario: any;
  public usuario_inventario: any;
  public cedtra: any;
  public activos: any;
  public activos_I: any;
  public tactivos: any;
  public array: any = [];
  public conta19: any;
  public lista_activos: any = [];
  public cedtraConsultado: any;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  public options: any;
  ao = [];
  ap = [];
  public datosActivos: any;
  public lista_estado: any = [];
  public lista_observacion: any = [];
  public searchValue: any;
  public listaInventariados: any = [];

  constructor(private _conta19Service: Conta19Service, private _router: Router) {

    this.token = JSON.parse(localStorage.getItem("tokenConsultado") + '');
    this.cedtraConsultado = JSON.parse(localStorage.getItem('tokenConsultado') + '');
    this.usuario_inventario = JSON.parse(localStorage.getItem('identity') + '');
    console.log("dependencia!!!");
    console.log(this.cedtraConsultado);
    this.encargado = this.token['nombre'];
    this.usuario = this.usuario_inventario['sub'];
    this.cedtra = this.token['cedtra'];




    this._conta19Service.preguntarContinuarInventario_(new Gener02('', '', this.cedtra)).subscribe(
      response => {
        this.listaInventariados = response;
        console.log("response");
        console.log(response);
      }, error => {
        console.log("error");
        console.log(error);
      }
    );
    this.getConta19(this.cedtra);
    this.searchValue = null;
  }

  ngOnInit(): void { }
  clearSearch() {
    this.searchValue = '';
  }

  input(event) {

  }

  onCambio(event, dato: any): void {
    let bandera = false;
    console.log("valueeeeeeeeee");
    const newVal = event.target.value;
    console.log(newVal + ' ' + dato);
    if (this.lista_estado.length > 0) {
      for (let index = 0; index < this.lista_estado.length; index++) {
        if (this.lista_estado[index][1] == dato) {
          this.lista_estado.splice(index, 1);
          console.log(this.lista_estado);
          bandera = true;
        }
      }
      if (bandera) {
        this.lista_estado.push([newVal, dato]);
        console.log(this.lista_estado);
      } else {
        this.lista_estado.push([newVal, dato]);
        console.log(this.lista_estado);
      }
    } else {
      this.lista_estado.push([newVal, dato]);
      console.log(this.lista_estado);
    }


  }
  onText(event, dato: any): void {
    let bandera = false;
    console.log("valueeeeeeeeee texto");
    const newVal = event.target.value;
    console.log(newVal + ' ' + dato);
    console.log(newVal + ' ' + dato);
    if (this.lista_observacion.length > 0) {
      for (let index = 0; index < this.lista_observacion.length; index++) {
        if (this.lista_observacion[index][1] == dato) {
          this.lista_observacion.splice(index, 1);
          console.log(this.lista_observacion);
          bandera = true;
        }
      }
      if (bandera) {
        this.lista_observacion.push([newVal, dato]);
        console.log(this.lista_observacion);
      } else {
        this.lista_observacion.push([newVal, dato]);
        console.log(this.lista_observacion);
      }
    } else {
      this.lista_observacion.push([newVal, dato]);
      console.log(this.lista_observacion);
    }
  }

  getConta19(cedtra: any) {
    var posiciones: any = [];
    this._conta19Service.getConta19(new Conta19_Copia(cedtra)).subscribe(response => {
      console.log("respuesta");
      console.log(response);
      if (response.status != 'error') {
        this.activos = response;
        console.log("aaaaaa :)")

        console.log("longitud!");
        console.log(this.listaInventariados.length);

        for (let index = 0; index < this.listaInventariados.length; index++) {
          for (let index2 = 0; index2 < this.activos.length; index2++) {
            if (this.activos[index2]['codact'] == this.listaInventariados[index]['codact']) {
              posiciones.push(index2);
              this.activos[index2]['checked'] = true;
              this.onChangeForInventariados(this.activos[index2]);
              console.log("trueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            }
          }
        }


        if (posiciones.length > 0) {
          for (let index = 0; index < posiciones.length; index++) {
            this.activos[posiciones[index]]['checked'] = true;
          }
        }

        console.log("comparación");
        console.log(this.activos);
        console.log(posiciones);

        if (this.activos.length > 1000) {
          this.longi = 1000
        } else {
          this.longi = this.activos.length;
        }
        console.log(this.longi);
        if (this.activos.length > 0) {
          for (let index = 0; index < this.activos.length; index++) {
            this.tactivos = index + 1;
          }
        } else {
          this.tactivos = 0;
          Swal.fire('Error', 'No existen activos registrados!', 'info');
        }

      } else {
        this.activos = '';
        Swal.fire('Error', 'No se han encontrado activos', 'info');
        this._router.navigate(['home']);
      }

    });
  }
  confirmaciones(ao1: any = [], ap1: any = []) { // Detalle
    Swal.fire({
      title: '<strong>Estado <u>Activo</u></strong>',
      icon: 'info',
      input: 'select',
      inputOptions: {
        'Estado': {
          B: 'Bueno',
          R: 'Regular',
          D: 'Dañado',
          O: 'Obsoleto'
        }
      },
      inputPlaceholder: 'Seleccione el estado del activo!',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value == '') {
            Swal.fire('Error!', 'No ha seleccionado el estado!', 'error');
            delay(1000);
            this.confirmaciones(ao1, ap1);
          } else {
            console.log(value);
            Swal.fire('Listo!', 'Ha seleccionado el estado: ' + value, 'success');
            var bdc = true;
            ao1.push(value);
            if (bdc) {
              this.confirmacionDetalle(ap1);
            }
          }
        })
      }

    });
  }
  confirmacionDetalle(ap1: any = []) {
    Swal.fire({
      title: ' <strong>Ingrese la Observación del <u>Activo</u></strong>',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (login.length > 199 || login.length == 0) {
          Swal.fire('Error!', 'Observación Incorrecta.', 'error');
          this.confirmacionDetalle(ap1);
        } else {
          ap1.push(login);
          Swal.fire('Listo!', 'Observación Correcta.', 'success');
          console.log(login);
        }
      }
    })
  }
  guardar() {
    Swal.fire({
      title: 'Custom width, padding, color, background.',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
    })
  }
  submit() {
    if (this.array.length > 0) {
      Swal.fire({

        title: "¿Estas Seguro?",
        text: "Se modificaran los activos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4BB543',
        cancelButtonColor: '#EA1737',
        confirmButtonText: 'Iniciar'

      }).then(result => {
        let bandera: any;
        let bandera2: any;
        if (result.value) {

          for (let index1 = 0; index1 < this.array.length; index1++) {
            if (this.lista_observacion.length > 0) {
              for (let index2 = 0; index2 < this.lista_observacion.length; index2++) {

                if (this.array[index1].codact == this.lista_observacion[index2][1]) {
                  this.array[index1].observacion = this.lista_observacion[index2][0];

                  bandera = true;
                } else {
                  bandera = false;
                }


              }
              if (bandera == false) {
                this.array[index1].observacion = 'sin observacion';
              }
            } else {
              this.array[index1].observacion = 'sin observacion';
            }


          }

          for (let index1 = 0; index1 < this.array.length; index1++) {
            if (this.lista_estado.length > 0) {
              for (let index2 = 0; index2 < this.lista_estado.length; index2++) {
                if (this.array[index1].codact == this.lista_estado[index2][1]) {
                  this.array[index1].estado = this.lista_estado[index2][0];
                  bandera2 = true;
                } else {
                  bandera2 = false;
                }

              }
              if (bandera2 == false) {
                this.array[index1].estado = 'B';
              }
            } else {
              this.array[index1].estado = 'B';
            }


          }
          for (let index = 0; index < this.array.length; index++) {
            this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.array[index].estado, this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.array[index].observacion);
            this.lista_activos.push(this.conta19);
          }

          for (let index = 0; index < this.lista_activos.length; index++) {
            for (let index2 = 0; index2 < this.activos.length; index2++) {
              if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
                this.activos.splice(index2, 1);
              }
            }

          }
          console.log("Inventariados");
          console.log(this.lista_activos);
          console.log("Faltantes!")
          console.log(this.activos);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              result: JSON.stringify(this.lista_activos),
              faltantes: JSON.stringify(this.activos)
            }
          }
          Swal.fire('Listo!', 'Activos(s) guardados', 'success');
          this._router.navigate(['sobrante-conta19'], navigationExtras);
        } else {


          console.log('yes');
          Swal.fire('Cancelado!', 'Activos(s) No guardados', 'error');
        }
      })

    } else {



      console.log("Faltantes!")
      console.log(this.activos);
      const navigationExtras: NavigationExtras = {
        queryParams: {
          result: JSON.stringify(this.lista_activos),
          faltantes: JSON.stringify(this.activos)
        }
      }
      let timerInterval
      Swal.fire({
        title: 'No ha seleccionado ningun activo!',
        timer: 3000,
        didOpen: () => { },
        willClose: () => {
          clearInterval(timerInterval);

          this._router.navigate(['sobrante-conta19'], navigationExtras);
        }
      }).then((result) => { /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) { }
      })
    }

  }
  capturar(dt: any) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion)
  }

  onChangeForInventariados(result: any) {

    this.clearSearch()
    this.searchValue = '';
    if (result.checked == true) {
      result.checked = false;
    }
    result.checked = true;
    var select = document.getElementById("estado")

    console.log("selected");
    console.log(select);
    var bandera = false;

    const navigationExtras: NavigationExtras = {
      queryParams: {

        result: JSON.stringify(result)
      }
    }
    this.searchValue = '';
    const isChecked = true;

    if (isChecked == true) {
      this.searchValue = '';
      if (this.array.length > 0) {
        for (let index = 0; index <= this.array.length; index++) {
          if (this.array[index] == result) {
            console.log(this.array[index]);
            console.log(result);
            bandera = true;
          }
        }
        if (bandera != true) {

          this.array.push(result);
          console.log("seleeee");
          console.log(this.array);
          this.searchValue = '';
        }
      } else {
        result.checked = false;
        this.array.push(result);
        console.log("seleeee");
        this.searchValue = '';
      }
    }
    console.log("seleccionados!");
    console.log(this.array);


  }



  onChange($event, result: any) {
    this.clearSearch()
    this.searchValue = '';
    if (result.checked == true) {
      result.checked = false;
    }
    result.checked = true;
    var select = document.getElementById("estado")
    var bandera = false;

    const navigationExtras: NavigationExtras = {
      queryParams: {

        result: JSON.stringify(result)
      }
    }
    this.searchValue = '';
    const isChecked = $event.target.checked;

    if (isChecked == true) {
      this.searchValue = '';
      if (this.array.length > 0) {
        for (let index = 0; index <= this.array.length; index++) {
          if (this.array[index] == result) {
            console.log(this.array[index]);
            console.log(result);
            bandera = true;
          }
        }
        if (bandera != true) {

          this.array.push(result);
          console.log("seleeee");
          console.log(this.array);
          this.searchValue = '';

        }
      } else {
        result.checked = false;
        this.array.push(result);
        console.log("seleeee");
        this.searchValue = '';

      }
    }
    /*  
     //sirve para
     for (let index = 0; index <= this.array.length; index++) {
       if (this.array[index] == result) {   
         result.checked = false;
         this.array.splice(index, 1);
         this.ao.splice(index, 1);
         this.ap.splice(index, 1);
         this.searchValue = '';
       }
     } */

    for (let index = 0; index < this.array.length; index++) { }
    console.log(this.ao); // estado
    console.log(this.ap); // detalle
    console.log(this.array); // activos
    delay(3000);
    this.searchValue = '';
  }

  guardarFaltantes(listaF: any) {
    var lista_success: any = [];
    var bandera: any;
    if (listaF.length > 0) {


      for (let index = 0; index < listaF.length; index++) {

        this._conta19Service.saveConta124(new Conta124('01', listaF[index]['codact'], listaF[index]['subcod'], this.cedtraConsultado.coddep, listaF[index]['est'], 'F', 'F', 'Faltantes', this.cedtraConsultado.cedtra)).subscribe(response => {

          if (response.status == "success") {
            bandera = true;
          } else {

            bandera = false;
          }
        })
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Activos Faltantes guardados correctamente!',
        showConfirmButton: false,
        timer: 1500,
        confirmButtonText: 'Look up'
      }).then((result) => {
        this._router.navigate(['home']);
      });


    } else {
      Swal.fire('Info!', '¡No existen Activos Faltantes!.', 'info').then((result) => {
        this._router.navigate(['home']);
      });

    }
  }

  onSubmit() {
    let bandera: any;
    let bandera2: any;
    Swal.fire({
      title: '¿Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`
    }).then((result) => {
      if (result.isConfirmed) {

        for (let index1 = 0; index1 < this.array.length; index1++) {
          if (this.lista_observacion.length > 0) {
            for (let index2 = 0; index2 < this.lista_observacion.length; index2++) {

              if (this.array[index1].codact == this.lista_observacion[index2][1]) {
                this.array[index1].observacion = this.lista_observacion[index2][0];
                bandera = true;
              } else {
                bandera = false;
              }


            }
            if (bandera == false) {
              this.array[index1].observacion = 'sin observacion';
            }
          } else {
            this.array[index1].observacion = 'sin observacion';
          }
        }
        for (let index1 = 0; index1 < this.array.length; index1++) {
          if (this.lista_estado.length > 0) {
            for (let index2 = 0; index2 < this.lista_estado.length; index2++) {
              if (this.array[index1].codact == this.lista_estado[index2][1]) {
                this.array[index1].estado = this.lista_estado[index2][0];
                bandera2 = true;
              } else {
                bandera2 = false;
              }

            }
            if (bandera2 == false) {
              this.array[index1].estado = 'B';
            }
          } else {
            this.array[index1].estado = 'B';
          }


        }
        for (let index = 0; index < this.array.length; index++) {
          this.conta19 = new Conta19(this.array[index].codact, this.array[index].subcod, this.array[index].codbar, this.array[index].estado, this.array[index].detalle, this.array[index].codare, this.array[index].coddep, this.array[index].codubi, this.array[index].cedtra, this.array[index].codcen, this.usuario, this.array[index], this.array[index].observacion);
          this.lista_activos.push(this.conta19);
        }

        for (let index = 0; index < this.lista_activos.length; index++) {
          for (let index2 = 0; index2 < this.activos.length; index2++) {
            if (this.lista_activos[index]['codact'] == this.activos[index2]['codact']) {
              this.activos.splice(index2, 1);
            }
          }

        }

        if (this.lista_activos.length > 0) {

          this._conta19Service.saveConta123(new Conta123(this.usuario, this.cedtraConsultado.cedtra, 'A')).subscribe(response => {
            if (response.status == 'success') {
              for (let index = 0; index < this.lista_activos.length; index++) {

                console.log(this.lista_activos[index]['est']['est']);
                this._conta19Service.saveConta124(new Conta124('01', this.lista_activos[index]['codact'], this.lista_activos[index]['subcod'], this.cedtraConsultado.coddep, this.lista_activos[index]['est']['est'], this.lista_activos[index]['estado'], 'I', this.lista_activos[index]['observacion'], this.cedtraConsultado.cedtra)).subscribe(response => {
                  if (response.status == "success") {

                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Activos Inventariados guardados correctamente!',
                      showConfirmButton: true,
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.guardarFaltantes(this.activos);
                      }
                    });
                  } else {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'Activos Inventariados NO guardados!',
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }
                })
              }
            }
          })
        } else {

          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'No existen Activos inventariados!',
            footer: 'Se procedera a guardar los Activos faltantes',
            showConfirmButton: true,
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this._conta19Service.saveConta123(new Conta123(this.usuario, this.cedtraConsultado.cedtra, 'A')).subscribe(response => {
                if (response.status == 'success') {
                  this.guardarFaltantes(this.activos);
                }
              });

            }
          })

        }
      } else if (result.isDenied) {
        Swal.fire('Activos no guardados', '', 'info')
      }
    })
  }

}
