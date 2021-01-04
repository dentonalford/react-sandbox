import * as React from 'react';
import { input } from './TimelineControls.styles';
import { capitalCase } from 'change-case';

export interface TimelineControlsProps {}

export interface InputProps {
  text: string;
}

const Input: React.FC<InputProps> = ({ text }) => {
  const id = `timescale-button-${text.toLowerCase()}`;

  return (
    <React.Fragment>
      <input css={input} type="radio" id={id} name="timescale" />
      <label htmlFor={id}>{capitalCase(text)}</label>
    </React.Fragment>
  );
};

export const TimelineControls: React.FC<TimelineControlsProps> = () => {
  return (
    <div role="group">
      <Input text="day" />
      <Input text="week" />
      <Input text="month" />
      <Input text="year" />
    </div>
  );
};
