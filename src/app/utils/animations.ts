import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
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
            // 🔁 cambio de color del borde (como antes)
            borderColor: '{{borderA}} {{borderA}} {{borderB}} {{borderB}}',

            // ✨ chispa aleatoria
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
