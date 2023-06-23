import React from 'react';
import { Tape } from '../api/tapedeck-api';

interface ITapeCard {
  tape: Tape;
}

function createContainer(attributeName: string, attribute?: string) {
  return (
    <div className={attribute ? '' : 'text-gray-300'}>
      {attribute || `${attributeName} unknown`}
    </div>
  );
}

const TapeCard: React.FC<ITapeCard> = ({ tape }): JSX.Element => {
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'tape.png';
  };

  return (
    <figure className="border-grey border-2 rounded-lg p-3 min-w-min max-w-xs">
      <a href={tape.page} target="_blank">
        <img
          src={tape.thumb || 'tape.png'}
          alt={`tape-${tape.brand}`}
          onError={onImageError}
          className="border-black border-2 rounded-lg w-full"
        />
      </a>
      <figcaption className="text-center min-w-full pt-3">
        {createContainer('Brand', tape.brand)}
        {createContainer('Play Time', tape.playingTime)}
        {createContainer('Type', tape.type)}
        {createContainer('Color', tape.color)}
      </figcaption>
    </figure>
  );
};

export default TapeCard;
