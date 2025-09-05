import s from './Loader.module.scss';

const Loader = () => {
  const NUMBER_OF_DOTS = 12;
  return (
    <div className="text-center" data-testid="loader">
      <div className={s.lds}>
        {Array.from({ length: NUMBER_OF_DOTS }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
