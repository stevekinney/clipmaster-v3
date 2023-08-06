import clsx from 'clsx';
import React from 'react';

const CopyFromClipboard = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <div className="flex border-b-2 shadow-md border-primary-700">
      <button
        className={clsx('flex-1 w-full rounded-none text-white', className)}
        {...props}
      >
        Copy from Clipboard
      </button>
    </div>
  );
};

export default CopyFromClipboard;
