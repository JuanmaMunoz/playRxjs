import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
  state,
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
    transition(
      'a <=> b',
      [
        animate(
          `${duration}ms linear`,
          style({
            borderColor: '{{borderA}} {{borderA}} {{borderB}} {{borderB}}',
            boxShadow: '{{spark}}',
            filter: 'opacity({{opacity}})',
          }),
        ),
      ],
      {
        params: {
          borderA: 'var(--secondary-color)',
          borderB: 'var(--primary-color)',
          spark: '0 0 0.5rem var(--primary-color)',
          opacity: 0.4,
        },
      },
    ),
  ];

  return trigger('spin', definitions);
};

export const slideToggle = (duration = 300): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    state(
      'open',
      style({
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        transform: 'translateX(0)',
      }),
    ),

    state(
      'closed',
      style({
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        transform: 'translateX(1rem)',
      }),
    ),

    transition('closed => open', [animate(`${duration}ms ease-out`)]),

    transition('open => closed', [animate(`${duration}ms ease-in`)]),
  ];

  return trigger('slideToggle', definitions);
};

export const fadeToggle = (duration = 200): AnimationTriggerMetadata => {
  const definitions: AnimationMetadata[] = [
    state(
      'visible',
      style({
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        display: 'flex',
      }),
    ),
    state(
      'hidden',
      style({
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        display: 'none',
      }),
    ),

    transition('hidden => visible', [style({ opacity: 0.5 }), animate(`${duration}ms ease-out`)]),

    transition('visible => hidden', [animate(`${duration / 2}ms ease-in`)]),
  ];
  return trigger('fadeToggle', definitions);
};
