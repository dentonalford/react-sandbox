import * as React from 'react';

type SplitShortands = 'half' | 'third' | 'quarter';
type Split = SplitShortands | string;

interface FixedHorizontalProps {
  splits?: Split[];
}

type CalcPercentString = (x: number, y: number) => string;
const calcPercentString: CalcPercentString = (x, y) => `${(x / y) * 100}%`;

export const FixedHorizontal: React.FC<FixedHorizontalProps> = ({
  children,
  splits = null,
}) => {
  const columns = React.Children.count(children);
  const childComponents = React.Children.toArray(children);

  const splitMap = {
    half: calcPercentString(1, 2),
    third: calcPercentString(1, 3),
    quarter: calcPercentString(1, 4),
  };

  return (
    <div
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
      }}
    >
      {Array(columns)
        .fill(null)
        .map((_, columnIndex) => {
          return (
            <div
              key={columnIndex}
              css={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis:
                  splits === null
                    ? calcPercentString(1, columns)
                    : splitMap[splits[columnIndex]],
              }}
            >
              {childComponents[columnIndex]}
            </div>
          );
        })}
    </div>
  );
};
