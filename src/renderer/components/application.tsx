import React from 'react';
import CreateClipping from './create-clipping';
import Clipping from './clipping';
import { useClippings } from '../use-clipping';
import CopyFromClipboard from './copy-from-clipboard';

const Application = () => {
  const { clippings, addClipping, removeClipping } = useClippings();

  return (
    <main className="flex flex-col w-screen h-screen">
      <header
        className="flex items-center h-8 font-semibold text-white bg-primary-400"
        id="title-bar"
      >
        <h1 className="w-full text-center">Clipmaster</h1>
      </header>
      <CreateClipping onSubmit={addClipping} />
      <section className="flex flex-col h-full gap-2 p-4 overflow-y-scroll">
        {clippings.map((clipping) => (
          <Clipping
            key={clipping.id}
            id={clipping.id}
            value={clipping.value}
            onRemove={removeClipping}
          />
        ))}
      </section>
      <CopyFromClipboard />
    </main>
  );
};

export default Application;
