import React, { FC } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Btn.module.css';

interface IBtn {
  text: string;
  link: string;
}

export const Btn: FC<IBtn> = ({ text, link }) => (
  <Button variant="contained" className={styles.btn}>
    <Link to={link}>{text}</Link>
  </Button>
);
