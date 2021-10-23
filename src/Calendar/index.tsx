import * as React from 'react';

import { makeMoments } from '../data/makeMoments';

const fetchMoments = async (set: React.Dispatch<any>): Promise<void> => {
  const data = await makeMoments(10);
  console.log('setting data?', data);
  if (data) set(data);
};

export const Calendar = (): JSX.Element => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchMoments(setData);
  }, []);

  return (
    <div>
      {data
        ? data.moment.map((moment) => <Card key={moment.uuid} {...moment} />)
        : null}
    </div>
  );
};

const Card = ({ id, title, scheduledAt, image }): JSX.Element => (
  <CardContainer>
    <ImageContainer>
      <img
        css={{
          objectFit: 'contain',
          maxWidth: '100%',
          borderRadius: '8px 8px 0 0',
        }}
        src={image}
      />
    </ImageContainer>
    id: {id}
    title: {title}
    scheduledAt: {scheduledAt}
  </CardContainer>
);

const CardContainer: React.FC = ({ children }) => (
  <div
    css={{
      width: 'calc(100% / 7)',
      borderRadius: 8,
      border: '1px solid black',
      fontFamily: 'segoe ui',
      fontSize: 10,
    }}
  >
    {children}
  </div>
);

const ImageContainer: React.FC = ({ children }) => (
  <div
    css={{
      width: '100%',
    }}
  >
    {children}
  </div>
);
