import { Component, Input ,OnInit} from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  
  @Input() titulo: string = 'Sin titulo';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  

public doughnutChartData: ChartData<'doughnut'> = {
  labels: [],
  datasets: [
    { data: [],
      backgroundColor: ['#6857E6','#009FEE','#F02059'] 
    },
  ]
};

//Cargamos los datos que le enviamos a los labels
ngOnInit() {

  this.doughnutChartData.labels = this.labels;
  this.doughnutChartData.datasets[0].data = this.data;
}
}
