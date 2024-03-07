import { Box, Container } from '@mui/material';
import { BazaarIcon } from '../assets/bazaar-icon';

import { useState } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { LikeIcon } from '../assets/like-icon';
import { LikeIconActive } from '../assets/like-icon-active';
import { numberWithSpaces } from '../utils/createCurrency';
import styles from './AdDetails.module.scss';

export const AdDetails = ({
  chooseItem,
  setSiteMode,
  likesArray,
  setLikesArray,
}) => {
  const [mainImg, setMainImg] = useState(chooseItem.images[0].image);
  const images = chooseItem.images;

  const handleChangeMainImg = (img) => {
    setMainImg(img);
  };

  const switchMode = () => {
    setSiteMode('adsList');
  };

  const handleLike = () => {
    if (likesArray.find((i) => i === chooseItem.id)) {
      setLikesArray(likesArray.filter((p) => p !== chooseItem.id));
      return;
    }
    setLikesArray([...likesArray, chooseItem.id]);
    localStorage.setItem('likes', JSON.stringify(likesArray));
  };

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#ffffff', height: '100vh' }}>
        <div className={styles.close_btn} onClick={switchMode}>
          <CloseIcon />
        </div>
        <div className={styles.logo}>
          <BazaarIcon />
        </div>
        <div className={styles.images_box}>
          <img className={styles.main_img} src={mainImg} alt="img" />

          <div className={styles.images_slides}>
            {images.map((item) => {
              return (
                <div
                  key={item.image}
                  onClick={() => handleChangeMainImg(item.image)}
                >
                  <img
                    className={styles.images_small}
                    src={item.image}
                    alt="img"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.info_box}>
          <div className={styles.box_mini}>
            <div className={styles.text_main}>{chooseItem.title}</div>
            <div>
              {chooseItem.city_name}, {chooseItem.district_name}
            </div>
          </div>

          <div className={styles.box_mini_right}>
            <div onClick={() => handleLike()} className={styles.like}>
              {likesArray.find((i) => i === chooseItem.id) ? (
                <LikeIconActive width={'30px'} height={'30px'} />
              ) : (
                <LikeIcon width={'30px'} height={'30px'} />
              )}
            </div>
            <div className={styles.text_common}>
              {numberWithSpaces(chooseItem.price)}
            </div>
          </div>
        </div>

        <div className={styles.description}>
          <div>Description: </div>
          <div>{chooseItem.description}</div>
        </div>
      </Box>
    </Container>
  );
};
