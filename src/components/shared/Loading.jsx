import { TbFidgetSpinner } from 'react-icons/tb';

function Loading() {
  return (
    <div className="px-4 py-2 h-full w-full">
      <TbFidgetSpinner
        size={25}
        className="animate-spin text-sky-500 mx-auto"
      />
    </div>
  );
}

export default Loading;
