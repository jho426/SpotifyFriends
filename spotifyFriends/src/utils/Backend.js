import CookieManager from '@react-native-cookies/cookies';
import Friend from './Friend';
import You from './You';
import {useState, createContext, useCallback, useEffect} from 'react';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const BackendContext = createContext();

export const BackendProvider = ({children}) => {
  const [sp_dc, setSp_dc] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [friendActivity, setFriendActivity] = useState('');
  const [yourActivity, setYourActivity] = useState({});
  const [friendsArray, setFriendsArray] = useState([]);
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    console.log('sp_dc:', sp_dc);
    console.log('access token:', accessToken);
    console.log('friend activity:', friendActivity);
  }, [sp_dc, accessToken, friendActivity]);

  useEffect(() => {
    console.log('sp_dc:', sp_dc);
    console.log('access token:', accessToken);
    console.log('friend activity:', friendActivity);
  }, [sp_dc, accessToken, friendActivity]);

  /*
   * This function will call all the functions needed to get the user's friend activity
   * @param {} none
   */
  const master_get_activity = async () => {
    console.log('Getting sp_dc');
    await get_sp_dc();
    console.log('Getting access token');
    console.log('access token:' + get_access_token(await get_sp_dc()));
    console.log('Getting activity');
    console.log(
      'activity:' + get_activity(await get_access_token(await get_sp_dc())),
    );
    console.log('Parsing activity');
    parse_friend_activity(
      await get_activity(await get_access_token(await get_sp_dc())),
    );

    get_your_activity(await get_access_token(await get_sp_dc()));
  };

  /*
   * This function gets the sp_dc cookie and returns it as a string
   * @param {} none
   */
  const get_sp_dc = async () => {
    try {
      const cookies = await CookieManager.getAll(true);
      console.log('start');
      console.log('between start and mid:', cookies);
      console.log('mid');
      console.log('between mid and end:', cookies.sp_dc);
      console.log('between mid and end 2:', cookies.sp_dc.value);
      if (cookies && cookies.sp_dc && cookies.sp_dc.value) {
        setSp_dc(cookies.sp_dc.value);
      } else {
        console.log('sp_dc cookie not found');
      }
      return cookies.sp_dc.value;
    } catch (error) {
      console.error('Error retrieving sp_dc cookie:', error);
      return null;
    }
  };

  /*
   * This function gets the access_token cookie and returns it as a string
   * @param {string} sp_dc
   */
  const get_access_token = async sp_dc => {
    await soft_clear_cookies();
    console.log('SP_DC HERE:', sp_dc);
    const myHeaders = new Headers();
    myHeaders.append('Cookie', `sp_dc=${sp_dc};`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
        requestOptions,
      );
      const result = await response.text();
      console.log(result);
      const jsonResult = await JSON.parse(result);
      console.log(jsonResult);
      const accessToken = await jsonResult.accessToken;
      console.log(accessToken);
      setAccessToken(accessToken);

      return accessToken;
    } catch (error) {
      console.log('error', error);
    }
  };

  /*
   * This function will take in the access_token cookie as a parameter, and return the user's activity as a string
   * @param {string} access_token
   */
  const get_activity = async access_token => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://guc-spclient.spotify.com/presence-view/v1/buddylist',
      requestOptions,
    );
    const result = await response.text();
    setFriendActivity(result);
    return result;
  };

  /*
   * This function parses the friend activity data
   */
  const parse_friend_activity = friendActivity => {
    try {
      if (!friendActivity) {
        console.log('Friend activity is undefined.');
        return;
      }

      const parsedData = JSON.parse(friendActivity);
      const friends = parsedData.friends;
      let localFriendsArray = [];

      friends.reverse().forEach(friend => {
        const friendObj = new Friend(
          friend.timestamp,
          friend.user,
          friend.track,
        );
        localFriendsArray.push(friendObj);
      });

      // Return the parsed friend activity
      setFriendsArray(localFriendsArray);
      return localFriendsArray;
    } catch (error) {
      // Handle the error
      console.error('Error parsing friend activity:', error);
    }
  };

  /*
   * This function clears all cookies and console.logs the result
   */
  const hard_clear_cookies = () => {
    CookieManager.clearAll(true).then(success => {
      console.log('CookieManager.clearAll =>', success);
    });
  };

  /*
   * This function clears all cookies and console.logs the result
   */
  const soft_clear_cookies = async () => {
    await CookieManager.clearAll().then(success => {
      console.log('CookieManager.clearAll =>', success);
    });
  };

  /*
   * This function gets all cookies and console.logs the result
   */
  const get_cookies = () => {
    CookieManager.getAll(true).then(cookies => {
      console.log('CookieManager.getAll =>', cookies);
    });
  };

  const get_your_activity = async access_token => {
    var myHeaders = new Headers();
    await get_user_profile(access_token)
    console.log("your profile: "+userInfo)
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://api.spotify.com/v1/me/player/recently-played',
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        const firstTrack = data.items[0];
        const youObj = new You(firstTrack.played_at, firstTrack.track, userInfo[0], userInfo[1], firstTrack.context.track);
        setYourActivity(youObj);
      })
      .catch(error => {
        console.log('Error:', error);
      });

    return yourActivity;
  };

  const get_user_profile = async access_token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://api.spotify.com/v1/me',
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        const displayName = data.display_name;
        const profilePhoto = data.images[0].url;
        console.log("profile:"+ profilePhoto)
        setUserInfo([displayName, profilePhoto])
      })
      .catch(error => {
        console.log('Error:', error);
      });
      
      return userInfo
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
        hard_clear_cookies,
        soft_clear_cookies,
        get_cookies,
        parse_friend_activity,
        master_get_activity,
        friendsArray,
        get_your_activity,
        yourActivity,
        get_user_profile
      }}>
      {children}
    </BackendContext.Provider>
  );
};

export default BackendProvider;
