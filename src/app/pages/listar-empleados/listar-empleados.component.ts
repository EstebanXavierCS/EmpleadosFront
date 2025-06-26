import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-empleados',
  imports: [RouterLink],
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent implements OnInit{

listaEmpleados: any[] = [];
constructor(private empleadoService: EmpleadoService) { 
  this.getEmpleados();
}
ngOnInit(): void {}

//metodo para obtener a los empleados
getEmpleados() {
  this.empleadoService.getEmpleados().subscribe((data: any) => {
    this.listaEmpleados = data;
  }); 
}

//método  para eliminar un empleado 
eliminarEmpleado(empleado: any,index:any){
  if(window.confirm(`¿Está seguro de eliminar al empleado ${empleado.nombre}?`)) {
    this.empleadoService.eliminarEmpleado(empleado._id).subscribe((data) => {
      this.listaEmpleados.splice(index, 1);
    });
  }
}

}
