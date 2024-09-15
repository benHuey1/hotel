// components/Hotels.tsx

import React from 'react';
import { Hotel } from '@/types/index';
import styles from './style.module.scss';

interface HotelListProps {
  hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div>
      <div className={styles.cards}>
        {hotels.map((hotel) => (
          <div key={hotel.id} className={styles.box}> 
            <div
              className={styles.box_card}
              style={{ backgroundImage: `url(${hotel.picture})` }}
            ></div>
            <div className={styles.box_text}>
              <p className={styles.unerlinedRed}>{hotel.capital}</p>
              <p>{hotel.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
