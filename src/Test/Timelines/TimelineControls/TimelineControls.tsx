import * as React from 'react';
import * as styles from './TimelineControls.styles';
import { capitalCase } from 'change-case';
import { useTimelineContext } from '../useTimelineContext/useTimelineContext';
import { Timescale } from '../useTimelineContext/timescale';

export interface InputProps {
  checked?: boolean;
  handleChange: (args: Timescale) => void;
  text: Timescale;
}

const Input: React.FC<InputProps> = ({
  checked = false,
  handleChange,
  text,
}) => {
  const id = `timescale-button-${text.toLowerCase()}`;

  return (
    <React.Fragment>
      <input
        checked={checked}
        css={styles.input}
        id={id}
        name="timescale"
        onChange={() => handleChange(text)}
        type="radio"
      />
      <label htmlFor={id}>{capitalCase(text)}</label>
    </React.Fragment>
  );
};

export const TimelineControls: React.FC = () => {
  const { timescale, setTimescale } = useTimelineContext();

  const isChecked = (inputTimescale: Timescale): boolean =>
    timescale === inputTimescale;

  const getInput = (timescale: Timescale): React.ReactElement<InputProps> => (
    <Input
      checked={isChecked(timescale)}
      text={timescale}
      handleChange={setTimescale}
    />
  );

  return (
    <div css={styles.container}>
      <div role="group">
        {getInput(Timescale.week)}
        {getInput(Timescale.month)}
        {getInput(Timescale.quarter)}
        {getInput(Timescale.year)}
      </div>
    </div>
  );
};
