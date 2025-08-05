import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const feedbackAnimations = [
  trigger('slideIn', [
    transition(':enter', [
      animate('0.3s ease-out', keyframes([
        style({ 
          opacity: 0, 
          transform: 'translateX(100%) scale(0.8)', 
          offset: 0 
        }),
        style({ 
          opacity: 0.8, 
          transform: 'translateX(-10px) scale(1.05)', 
          offset: 0.7 
        }),
        style({ 
          opacity: 1, 
          transform: 'translateX(0) scale(1)', 
          offset: 1 
        })
      ]))
    ]),
    transition(':leave', [
      animate('0.2s ease-in', keyframes([
        style({ 
          opacity: 1, 
          transform: 'translateX(0) scale(1)', 
          offset: 0 
        }),
        style({ 
          opacity: 0, 
          transform: 'translateX(100%) scale(0.8)', 
          offset: 1 
        })
      ]))
    ])
  ])
];