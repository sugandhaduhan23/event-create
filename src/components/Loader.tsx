import { createPortal } from 'react-dom';
import classes from'./Loader.module.css';

const Loader = () => {
  return createPortal(
    <div className={classes.spinner_container} role="status" aria-live="assertive" aria-busy="true">
      <div className={classes.spinner}></div>
    </div>, document.body
  );
};

export default Loader;
