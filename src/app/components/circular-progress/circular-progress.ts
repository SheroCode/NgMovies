import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  standalone: true,
  templateUrl: './circular-progress.html',
  styleUrl: './circular-progress.scss',
})
export class CircularProgress {
  value = input<number>(0); // Progress percentage (e.g., 78)
  size = input<number>(60); // SVG width & height
  strokeWidth = input<number>(6); // Ring thickness

  // SVG circle center
  center = computed(() => this.size() / 2);
  // SVG circle radius
  radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  // SVG circle circumference
  circumference = computed(() => 2 * Math.PI * this.radius());
  // Stroke offset for progress
  offset = computed(
    () => this.circumference() - (this.value() / 100) * this.circumference()
  );

  // Rounded value for display
  roundedValue = computed(() => Math.round(this.value()));

  // Color based on value
  strokeColor = computed(() => {
    const val = this.value();
    if (val < 50) return '#ef3b2c';
    if (val < 70) return '#c1ff1c';
    return '#2fd710';
  });
}
