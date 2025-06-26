import { Routes } from '@angular/router';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

export const routes: Routes = [
    {path: '', redirectTo: '/listar-empleados', pathMatch: 'full'},
    {path:'listar-empleados', component:ListarEmpleadosComponent, pathMatch: 'full'},
    {path: 'agregar-empleado', component: AgregarEmpleadoComponent, pathMatch: 'full'},
    {path:'editar-empleado/:id', component: EditarEmpleadoComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '/listar-empleados', pathMatch: 'full'}
];
