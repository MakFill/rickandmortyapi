import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IResultWithLike } from '@/interfaces';
import { Btn, Linkedin } from '@/components';
import styles from './Home.module.css';

interface IHome {
  characters: IResultWithLike[];
}

export const Home: FC<IHome> = ({ characters }) => (
  <section className={styles.wrapper}>
    <Autocomplete
      className={styles.autocomplete}
      disablePortal
      id="autocomplete"
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li {...props} key={option.id} className={styles.character}>
          <Link to={`/chars/${option.id}`}>{option.name}</Link>
        </li>
      )}
      options={characters}
      renderInput={(params) => <TextField {...params} label="Character" />}
    />
    <Btn text="List" link="list" />
    <Btn text="Liked list" link="/liked" />
    <Linkedin />
  </section>
);
