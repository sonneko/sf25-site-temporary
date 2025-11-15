import styles from './CheckMark.module.scss';

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    width='1.1em'
    height='1.1em'
    className={styles.checkSvg}
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
);

export default CheckIcon;
