import React, { FC, memo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { IInfinite, IResultWithLike } from '@/interfaces';
import { Btn } from '@/components';
import styles from './List.module.css';

interface IList {
  characters: IResultWithLike[];
}

const MemoBtn = memo(() => <Btn text="Return to main" link="/" />);

export const List: FC<IList> = ({ characters }) => {
  const [infiniteItems, setInfiniteItems] = useState<IInfinite>(() => ({
    items: [...characters.slice(0, 30)],
    hasMore: true,
  }));

  const fetchData = (): void => {
    if (infiniteItems.items.length >= characters.length) {
      setInfiniteItems((prev: IInfinite) => ({ items: [...prev.items], hasMore: false }));
    } else {
      setInfiniteItems((prev: IInfinite) => ({
        ...prev,
        items: [...prev.items, ...characters.slice(prev.items.length, prev.items.length + 10)],
      }));
    }
  };

  return (
    <>
      <MemoBtn />
      <InfiniteScroll
        className={styles.charsList}
        dataLength={infiniteItems.items.length}
        next={fetchData}
        hasMore={infiniteItems.hasMore}
        loader={<h4>Loading...</h4>}
        height={500}
      >
        {infiniteItems.items.map((item) => (
          <Link to={`/chars/${item.id}`} key={item.id} className={styles.character}>
            {item.name}
            <span> - </span>
            {item.status}
          </Link>
        ))}
      </InfiniteScroll>
    </>
  );
};
