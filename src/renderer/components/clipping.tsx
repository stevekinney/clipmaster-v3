import React from 'react';

type ClippingProps = Clipping & {
  onRemove: (id: string) => void;
  onCopy?: () => void;
};

const Clipping = ({ value, id, onRemove, onCopy }: ClippingProps) => {
  return (
    <article
      id={`clipping-${id}`}
      className="relative px-4 py-2 shadow-md border-primary-500 bg-primary-100 group"
    >
      <p className="overflow-x-hidden">{value}</p>
      <div className="absolute top-0 right-0 justify-end hidden group-hover:flex">
        <button
          className="px-2 py-1 text-white rounded-none bg-error-500 hover:bg-error-600 active:bg-error-700"
          onClick={() => onRemove(id)}
        >
          Delete
        </button>
        <button className="px-2 py-1 text-white rounded-none" onClick={onCopy}>
          Copy
        </button>
      </div>
    </article>
  );
};

export default Clipping;
