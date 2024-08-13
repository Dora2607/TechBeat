import { animate, style, transition, trigger } from '@angular/animations';

export const animation1 = trigger('animation1', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('700ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('700ms', style({ opacity: 0 }))]),
]);