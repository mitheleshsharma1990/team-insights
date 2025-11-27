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

  private svg: any;
  private x: any;
  private y: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private width = 400 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  private initialized = false;

  ngAfterViewInit(): void {
    this.initialized = true;
    this.createChart();
    this.updateChart(); // ensure first render happens
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized && changes['data']) {
      this.updateChart();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;

    d3.select(element).selectAll('svg').remove();

    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.x = d3.scaleBand().range([0, this.width]).padding(0.2);

    this.y = d3.scaleLinear().range([this.height, 0]);

    this.svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`);

    this.svg.append('g').attr('class', 'y-axis');
  }

  public updateChart(): void {
    if (!this.svg || !this.data?.length) return;

    // Update domains
    this.x.domain(this.data.map((d) => d.labels));

    this.y
      .domain([0, Math.max(1, d3.max(this.data, (d) => d.values) || 1)])
      .nice();

    // Update axes
    this.svg.select('.x-axis').call(d3.axisBottom(this.x));
    this.svg.select('.y-axis').call(d3.axisLeft(this.y));

    // Set up data join
    const bars = this.svg.selectAll('rect').data(this.data);

    // ENTER + UPDATE
    bars
      .enter()
      .append('rect')
      .merge(bars)
      .attr('x', (d: ChartData) => this.x(d.labels) || 0)
      .attr('y', (d: ChartData) => this.y(d.values))
      .attr('width', this.x.bandwidth())
      .attr('height', (d: ChartData) => this.height - this.y(d.values))
      .attr('fill', '#69b3a2');

    // EXIT
    bars.exit().remove();
  }
}
