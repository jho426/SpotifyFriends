import CookieManager from '@react-native-cookies/cookies';
import Friend from './Friend';
import {useState, createContext, useCallback} from 'react';

export const BackendContext = createContext();

export const BackendProvider = ({children}) => {
  const [sp_dc, setSp_dc] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  const [friendsArray, setFriendsArray] = useState([]);
  /*
   * This function will call all the functions needed to get the user's friend activity
   * @param {} none
   */
  const master_get_activity = async () => {
    for (let i = 0; i < 5 && friendsArray.length === 0; i++) {
      try {
        await get_sp_dc();
        await get_access_token(sp_dc);
        await get_activity(accessToken);
        await parseFriendActivity(friendActivity);
      } catch (error) {
        throw error;
      }
    }

    return friendsArray;
  };

  /*
   * This function gets the sp_dc cookie and returns it as a string
   * @param {} none
   */
  const get_sp_dc = async () => {
    CookieManager.getAll(true).then(cookies => {
      setSp_dc(cookies.sp_dc.value);
      console.log(sp_dc);
      return sp_dc;
    });
  };

  /*
   * This function gets the access_token cookie and returns it as a string
   * @param {string} sp_dc
   */
  const get_access_token = async sp_dc => {
    await clear_cookies();
    var myHeaders = new Headers();
    myHeaders.append('Cookie', `sp_dc=${sp_dc};`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setAccessToken(result.accessToken.toString());
      })
      .catch(error => console.log('error', error));
    return accessToken;
  };

  /*
   * This function will take in the access_token cookie as a parameter, and return the user's activity as a string
   * @param {string} access_token
   */
  const get_activity = async access_token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://guc-spclient.spotify.com/presence-view/v1/buddylist',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        setFriendActivity(result);
      })
      .catch(error => console.log('error', error));
    return friendActivity;
  };

  /*
   * This function parses the friend activity data
   */
  const parseFriendActivity = async friendActivity => {
    const parsedData = JSON.parse(friendActivity);
    const friends = parsedData.friends;
    let localFriendsArray = [];

    friends.reverse().forEach(friend => {
      const friendObj = new Friend(friend.timestamp, friend.user, friend.track);
      localFriendsArray.push(friendObj);
      console.log(`Timestamp: ${friendObj.timestamp}`);
      console.log(`User: ${friendObj.user.name}`);
      console.log(`Track: ${friendObj.track.name}`);
      console.log('-------------------------------------');
    });

    setFriendsArray(localFriendsArray);
    return friendsArray;
  };

  /*
   * This function clears all cookies and console.logs the result
   */
  const clear_cookies = async () => {
    CookieManager.clearAll().then(success => {
      console.log('CookieManager.clearAll =>', success);
    });
  };

  /*
   * This function gets all cookies and console.logs the result
   */
  const get_cookies = async () => {
    CookieManager.getAll(true).then(cookies => {
      console.log('CookieManager.getAll =>', cookies);
    });
  };

  return (
    <BackendContext.Provider
      value={{
        sp_dc,
        setSp_dc,
        get_sp_dc,
        accessToken,
        setAccessToken,
        get_access_token,
        friendActivity,
        setFriendActivity,
        get_activity,
        clear_cookies,
        get_cookies,
        parseFriendActivity,
        master_get_activity,
        friendsArray
      }}>
      {children}
    </BackendContext.Provider>
  );
};

export default BackendProvider;
