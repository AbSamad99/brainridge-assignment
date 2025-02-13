import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() label: string = 'Button';
  @Input() rounded: boolean = false;
  @Input() color: string = '';
  @Input() accountType: string = 'chequing';
  @Input() backgroundColor: string = '';
  @Input() size: string = '';
}
