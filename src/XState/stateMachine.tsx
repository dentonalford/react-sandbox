import { createMachine, assign } from 'xstate'

type ContainerKeys = 'A' | 'B' | 'C' | 'D'
type Context = { activeContainer: ContainerKeys | null }

type Events =
  | { type: 'CONTAINER_HOVERED'; containerKey: ContainerKeys }
  | { type: 'EXITING_CONTAINER_AREA' }
  | { type: 'CLICKING_ADD' }
  | { type: 'CANCELLING_PLACEHOLDER' }
  | { type: 'SUBMITTING_PLACEHOLDER' }

export const stateMachine = createMachine(
  {
    id: 'state-machine',
    initial: 'inactive',
    context: {
      activeContainer: null,
    },
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    states: {
      inactive: {
        on: {
          CONTAINER_HOVERED: {
            target: 'showing_add',
            actions: ['setActiveContainer'],
          },
        },
      },
      showing_add: {
        on: {
          CLICKING_ADD: 'showing_placeholder',
          CONTAINER_HOVERED: {
            target: 'showing_add',
            actions: ['setActiveContainer'],
          },
          EXITING_CONTAINER_AREA: {
            target: 'inactive',
            actions: ['resetActiveContainer'],
          },
        },
      },
      showing_placeholder: {
        on: {
          CANCELLING_PLACEHOLDER: 'showing_add',
          SUBMITTING_PLACEHOLDER: 'showing_add',
        },
      },
    },
  },
  {
    actions: {
      setActiveContainer: assign<Context, Events>({
        activeContainer: (context, event) => {
          if (event.type === 'CONTAINER_HOVERED') {
            return event.containerKey
          }
        },
      }),
      resetActiveContainer: assign<Context, Events>({
        activeContainer: null,
      }),
    },
  }
)
