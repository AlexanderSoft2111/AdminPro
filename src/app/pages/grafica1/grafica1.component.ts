import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 'Cocinas', 'Refrigeradoras', 'Tvs' ];
  public labels2: string[] = [ 'Entregas', 'Proyectos', 'Distribuidores' ];
  public labels3: string[] = [ 'Ciencias', 'Matemáticas', 'Sociales' ];
  public labels4: string[] = [ 'Helados', 'Galletas', 'Papas' ];

  public data1: number[] = [100,200,300];
  public data2: number[] = [50,150,350];
  public data3: number[] = [1000,2800,3500];
  public data4: number[] = [560,2560,3570];


}
