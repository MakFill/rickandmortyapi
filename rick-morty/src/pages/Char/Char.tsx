import React, {
  FC, useEffect, useState, memo,
} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { IResultWithLike } from '@/interfaces';
import { Btn } from '@/components';
import styles from './Char.module.css';

interface IChar {
  characters: IResultWithLike[];
  setCharacters: (e: IResultWithLike[]) => void;
}

const MemoBtn = memo(() => <Btn text="Return to main" link="/" />);

export const Char: FC<IChar> = ({ characters, setCharacters }) => {
  const { id } = useParams<{ id: string }>();
  const [char, setChar] = useState<IResultWithLike | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);

  const likeHandler = (str: 'like' | 'dislike') => {
    const bool: boolean = str === 'like';

    if (id) {
      const newCharacters: IResultWithLike[] = characters.map((elem) => {
        const likeState = elem.liked === null || elem.liked === !bool ? bool : null;
        return elem.id === +id ? { ...elem, liked: likeState } : elem;
      });
      setCharacters(newCharacters);
    }
  };

  useEffect(() => {
    if (id) {
      const person = characters.find((item) => item.id === +id);
      setChar(person || null);
    }
  }, [characters, id]);

  return (
    <>
      <MemoBtn />

      {char ? (
        <ul className={styles.charRows}>
          <li className={styles.wrapper}>
            <h2>{char.name}</h2>
            <button
              className={classNames(styles.like, {
                [styles.selectedLike]: char.liked === true,
              })}
              onClick={() => likeHandler('like')}
            />
            <button
              className={classNames(styles.dislike, {
                [styles.selectedLike]: char.liked === false,
              })}
              onClick={() => likeHandler('dislike')}
            />
          </li>
          <li>
            Species:
            {char.species}
          </li>
          <li>
            Gender:
            {char.gender}
          </li>
          <li>
            Location:
            {' '}
            <a href={char.location.url} target="_blank" rel="noopener noreferrer">
              {char.location.name}
            </a>
          </li>
          <li>
            Episodes:
            {' '}
            {char.episode.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </li>
          <li>
            Status:
            {char.status}
          </li>
          <li>
            Created:
            {char.created}
          </li>
        </ul>
      ) : (
        <div className={styles.noChars}>
          No chars with id:
          {id}
        </div>
      )}
      {showImage && char !== null ? (
        <figure>
          <img src={char.image} className={styles.img} alt={char.name} />
        </figure>
      ) : (
        <Button variant="outlined" onClick={() => setShowImage(true)} className={styles.showBtn}>
          Show image?
        </Button>
      )}
    </>
  );
};
