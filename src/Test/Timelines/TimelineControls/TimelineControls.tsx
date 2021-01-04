import * as React from 'react';
import { input } from './TimelineControls.styles';
import { capitalCase } from 'change-case';
import { Timescale, useTimelineContext } from '../useTimelineContext';

export interface TimelineControlsProps {}

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
        css={input}
        id={id}
        name="timescale"
        onChange={() => handleChange(text)}
        type="radio"
      />
      <label htmlFor={id}>{capitalCase(text)}</label>
    </React.Fragment>
  );
};

export const TimelineControls: React.FC<TimelineControlsProps> = () => {
  const { timescale, setTimescale } = useTimelineContext();

  console.log({ timescale });

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
    <div role="group">
      {getInput(Timescale.day)}
      {getInput(Timescale.week)}
      {getInput(Timescale.month)}
      {getInput(Timescale.year)}
    </div>
  );
};
