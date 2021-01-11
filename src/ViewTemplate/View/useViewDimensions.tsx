import * as React from 'react';

enum ActionTypes {
  registerWidth = 'registerWidth',
}

interface ReducerState {
  widthRegistry: {
    [key: string]: number;
  };
  reservedWidth: number;
}

type RegisterWidthPayload = { component: string; width: number };

interface ViewDimensionAction {
  type: ActionTypes;
  payload: RegisterWidthPayload;
}

type ViewDimentionReducer = (ReducerState, ViewDimensionAction) => ReducerState;

const reducer: ViewDimentionReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.registerWidth: {
      const { width, view } = action.payload;
      return {
        ...state,
        widthRegistry: { [view]: width },
        reservedWidth: Object.entries<number>(state.widthRegistry).reduce(
          (acc, [_, value]) => acc + value,
          0
        ),
      };
    }
    default:
      throw Error('Invalid action type');
  }
};

interface UseViewDimensions {
  reservedWidth: number;
  registerWidth: (RegisterWidthPayload) => void;
}

export type RegisterWidth = (RegisterWidthPayload) => void;

export const useViewDimensions = (): UseViewDimensions => {
  const initialState: ReducerState = {
    widthRegistry: {},
    reservedWidth: 0,
  };

  const [{ reservedWidth }, dispatch] = React.useReducer(reducer, initialState);

  const registerWidth = ({ component, width }: RegisterWidthPayload): void =>
    dispatch({
      type: ActionTypes.registerWidth,
      payload: { component, width },
    });

  return {
    reservedWidth,
    registerWidth,
  };
};
