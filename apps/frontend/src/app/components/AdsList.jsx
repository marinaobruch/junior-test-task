import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { BazaarIcon } from '../assets/bazaar-icon';
import { LikeIcon } from '../assets/like-icon';
import { LikeIconActive } from '../assets/like-icon-active';
import styles from './../index.module.scss';
import { numberWithSpaces } from './../utils/createCurrency';
import { AdDetails } from './AdDetails';

export const AdsList = () => {
  const [siteMode, setSiteMode] = useState('adsList');

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataOfAdds, setDataOfAdds] = useState();
  const [initDataOfAdds, setInitDataOfAdds] = useState();
  const [serverError, setServerError] = useState();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [manualText, setManualText] = useState('');

  const [chooseItem, setChooseItem] = useState();
  const [likesArray, setLikesArray] = useState(
    JSON.parse(localStorage.getItem('likes')) || []
  );

  const handleLike = (id) => {
    if (likesArray.find((i) => i === id)) {
      setLikesArray(likesArray.filter((p) => p !== id));
      return;
    }
    setLikesArray([...likesArray, id]);
    localStorage.setItem('likes', JSON.stringify(likesArray));
  };

  const fetchAds = useCallback(() => {
    setServerError('');

    const fetchData = async () => {
      setIsLoadingData(true);
      const { data } = await axios
        .get('http://localhost:8000/api/ads', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .catch((error) => {
          if (error.response) {
            setServerError(error.response.data);
            setIsLoadingData(false);
          }
        });
      setInitDataOfAdds(data?.results);
      setDataOfAdds(data?.results);
      setIsLoadingData(false);
    };
    fetchData();
  }, []);

  const handleFilterCity = (event) => {
    setCity(event.target.value);
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.city_name) {
        return item.city_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    });
    setDataOfAdds(arrayForFilter);
  };

  const handleFilterDistrict = (event) => {
    setDistrict(event.target.value);
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.district_name) {
        return item.district_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    });
    setDataOfAdds(arrayForFilter);
  };

  const handleFilterMinPrice = (event) => {
    setMinPrice(event.target.value);
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.price) {
        return item.price > event.target.value;
      }
    });
    setDataOfAdds(arrayForFilter);
  };

  const handleFilterMaxPrice = (event) => {
    setMaxPrice(event.target.value);
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.price) {
        return item.price < event.target.value;
      }
    });
    setDataOfAdds(arrayForFilter);
  };

  const handleFilterText = (event) => {
    setManualText(event.target.value);
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.title) {
        return item.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }
    });
    setDataOfAdds(arrayForFilter);
  };

  const handleChooseAd = (id) => {
    const arrayForFilter = initDataOfAdds?.filter((item) => {
      if (item.id) return item.id === id;
    });
    setChooseItem(arrayForFilter[0]);
    setSiteMode('AdDetails');
  };

  return (
    <>
      {siteMode === 'adsList' ? (
        <div className={styles.container}>
          <BazaarIcon />
          <Button onClick={fetchAds} variant="outlined">
            Start searching !
          </Button>
          <div className={styles.loading_circle}>
            {isLoadingData && <CircularProgress />}
          </div>
          {serverError && (
            <Alert severity="error">
              {serverError.message}. Type of error: {serverError.statusCode}.
              Please try again later.
            </Alert>
          )}

          <div className={styles.filter_group}>
            <h1 className={styles.heading}>List of ads</h1>
            <div className={styles.filter_btns}>
              <TextField
                id="outlined-basic"
                label="city"
                variant="outlined"
                value={city}
                onChange={handleFilterCity}
              />
              <TextField
                id="outlined-basic"
                label="min price"
                variant="outlined"
                value={minPrice}
                onChange={handleFilterMinPrice}
              />
              <TextField
                id="outlined-basic"
                label="max price"
                variant="outlined"
                value={maxPrice}
                onChange={handleFilterMaxPrice}
              />
              <TextField
                id="outlined-basic"
                label="district"
                variant="outlined"
                value={district}
                onChange={handleFilterDistrict}
              />
              <TextField
                id="outlined-basic"
                label="title"
                variant="outlined"
                value={manualText}
                onChange={handleFilterText}
              />
            </div>
          </div>

          <div className={styles.box_ads}>
            {dataOfAdds?.length > 0 &&
              dataOfAdds.map((item) => (
                <div key={item.id} className={styles.box_item}>
                  <img className={styles.item_img} src={item.images[0].image} />
                  <div className={styles.box_texts}>
                    <div className={styles.box_item_small}>
                      <div
                        onClick={() => handleChooseAd(item.id)}
                        className={styles.items_title}
                      >
                        {item.title}
                      </div>
                      <div className={styles.items_heading}>
                        {item.city_name}
                      </div>
                    </div>
                    <div className={styles.box_item_small_right}>
                      <div
                        onClick={() => handleLike(item.id)}
                        className={styles.items_like}
                      >
                        {likesArray.find((i) => i === item.id) ? (
                          <LikeIconActive width={'30px'} height={'30px'} />
                        ) : (
                          <LikeIcon width={'30px'} height={'30px'} />
                        )}
                      </div>
                      <div className={styles.items_heading}>
                        {numberWithSpaces(item.price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {dataOfAdds?.length === 0 ||
            (dataOfAdds === undefined && (
              <div className={styles.info_box}>
                <Alert severity="info">
                  There are no results here yet, but they will appear soon.
                  Start your search!
                </Alert>
              </div>
            ))}
        </div>
      ) : (
        <AdDetails
          chooseItem={chooseItem}
          setSiteMode={setSiteMode}
          likesArray={likesArray}
          setLikesArray={setLikesArray}
        />
      )}
    </>
  );
};
