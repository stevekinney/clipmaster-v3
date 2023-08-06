import React, { useState } from 'react';

type CreateClippingProps = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: (value: string) => void;
};

const CreateClipping = ({ onSubmit }: CreateClippingProps) => {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
      className="flex border-b-2 shadow-md border-primary-700"
    >
      <label className="sr-only">New Clipping</label>
      <input
        value={value}
        className="w-full border-none"
        placeholder='Type a new clipping and press "Enter" to save'
        id="new-clipping"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!value}
        className="flex-1 w-full rounded-none"
      >
        Save to Clipboard
      </button>
    </form>
  );
};

export default CreateClipping;
