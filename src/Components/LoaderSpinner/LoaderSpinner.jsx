import Loader from 'react-loader-spinner';
import css from './LoaderSpinner.module.css';

export const LoaderSpinner = () => {
  return (
    <div className={css.spinner}>
      <Loader type="Oval" color="#ff255f" height={30} width={30} />
      />
    </div>
  );
};
