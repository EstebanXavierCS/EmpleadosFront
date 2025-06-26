import { Component, NgZone,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-agregar-empleado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit{

  // properties
  empleadoForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  empleadoDepartamento: any = [
    'Administración',
    'Contabilidad',
    'Recursos Humanos',
    'TI',
    'Ventas'
  ];

  constructor ( public formBuilder:FormBuilder, private router:Router, private ngZone:NgZone, private empleadoService:EmpleadoService){
    this.mainForm();
  }
  ngOnInit(): void {}


  //metodo para definir el formulario
  mainForm(){
    this.empleadoForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      telefono:['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    });
  }

  //metodo  que asigna el departamento seleccionado a la propiedad del formulario
  actualizarDepartamento(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const departamentoSeleccionado = seleccionarElemento.value;
    this.empleadoForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  //getter para acceder a los controles del formulario 
  get myForm() {
    return this.empleadoForm.controls;
  }

  //metodo que se ejecuta cuando se hace el submit
  onSubmit(): void {
    this.enviado = true;
    if (!this.empleadoForm.valid) {
      return;
    } else {
      this.empleadoService.agregarEmpleado(this.empleadoForm.value).subscribe({
        complete: () => {
          console.log('Empleado agregado correctamente');
          this.ngZone.run(() => this.router.navigateByUrl('/listar-empleados'));
        },
        error: (e) => {
          console.log(e);  
        }
      });
    }
  }
}


