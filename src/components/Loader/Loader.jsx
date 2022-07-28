import { Triangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Triangle
      height="180"
      width="180"
      radius="9"
      color="green"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        dispay: 'flex',
        justifyContent: 'center',
        marginTop: 200,
      }}
      wrapperClass
    />
  );
};

export { Loader };
