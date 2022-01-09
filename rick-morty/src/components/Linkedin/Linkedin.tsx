import React from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import styles from './Linkedin.module.css';

const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

export const Linkedin = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: REACT_APP_CLIENT_ID!,
    redirectUri: REACT_APP_REDIRECT_URI!,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return <button onClick={linkedInLogin} className={styles.img} />;
};
