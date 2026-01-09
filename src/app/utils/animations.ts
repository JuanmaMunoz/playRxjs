import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const show = (duration = 1000): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.1)' }),
      animate(`${duration}ms ease-out`, style({ opacity: 1, transform: 'scale(1)' })),
    ]),
  ];

  return trigger('show', definitions);
};

export const showApp = (duration = 500): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(
        `${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        style({
          opacity: 1,
        }),
      ),
    ]),
  ];

  return trigger('showApp', definitions);
};

export const spin = (duration = 2000): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    transition('a <=> b', [
      animate(
        `${duration}ms linear`,
        keyframes([
          style({
            borderColor:
              'var(--secondary-color) var(--secondary-color) var(--primary-color) var(--primary-color)',
            boxShadow: '0 0 1rem var(--secondary-color)',
            filter: 'opacity(0.1)',
            offset: 0,
          }),
          style({
            borderColor:
              'var(--primary-color) var(--primary-color) var(--secondary-color) var(--secondary-color)',
            boxShadow: '0 0 0.5rem var(--primary-color)',
            filter: 'opacity(1)',
            offset: 1,
          }),
        ]),
      ),
    ]),
  ];

  return trigger('spin', definitions);
};
