import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  standalone: true,
  templateUrl: './circular-progress.html',
  styleUrl: './circular-progress.scss',
})
export class CircularProgress {
  value = input<number>(0); // percentage like 78
  size = input<number>(60); // SVG width & height
  strokeWidth = input<number>(6); // ring thickness

  center = computed(() => this.size() / 2);
  radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  circumference = computed(() => 2 * Math.PI * this.radius());
  offset = computed(
    () => this.circumference() - (this.value() / 100) * this.circumference()
  );

  roundedValue = computed(() => Math.round(this.value()));

  strokeColor = computed(() => {
    const val = this.value();
    if (val < 50) return '#ef3b2c';
    if (val < 70) return '#c1ff1c';
    return '#2fd710';
  });
}
