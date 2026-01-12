import { FadeLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <FadeLoader />
    </div>
  );
}

export default Loader