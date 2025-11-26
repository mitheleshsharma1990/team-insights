import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

export interface ChartData {
  labels: string;
  values: number;
}

@Component({
  selector: 'lib-ui-charts',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="chart-container"></div>`,
  styleUrls: ['./ui-charts.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UiCharts implements OnChanges, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() data: ChartData[] = [];

  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private width = 400 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.chartContainer) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.data.map((d) => d.labels))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.values) || 10])
      .range([this.height, 0]);

    svg
      .append('g')
      .data([this.data])
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.labels) || 0)
      .attr('y', (d: any) => y(d.values))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.values))
      .attr('fill', '#69b3a2');

    svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }
}
