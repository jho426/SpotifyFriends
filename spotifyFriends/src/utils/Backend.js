import {useState, createContext, useMemo} from 'react';
import CookieManager from '@react-native-cookies/cookies';

import Friend from './Friend';
import You from './You';

export const BackendContext = createContext();

export const BackendProvider = ({children}) => {
  const [yourActivity, setYourActivity] = useState({});
  const [friendsArray, setFriendsArray] = useState([]);

  /**
   * This function will call all the functions needed to get the user's friend activity.
   * @param {none}
   */
  const masterGetActivity = async () => {
    try {
      // Step 1: Get the access token
      const accessToken = await getAccessToken(await getSpDcCookie());

      // Step 2: Get the friend activity and parse it
      parseFriendActivity(await getActivity(accessToken));

      // Step 3: Get your own activity using the access token and user profile
      await getYourActivity(accessToken, await getUserProfile(accessToken));

      // Print a message indicating the process is complete
      console.log('BOOM!');
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  };

  /**
   * This function gets all cookies and logs the result to the console.
   * @param {none}
   */
  const getCookies = () => {
    CookieManager.getAll(true).then(cookies => {
      console.log('CookieManager.getAll =>', cookies);
    });
  };

  /**
   * This function clears all cookies and console.logs the result
   */
  const hardClearCookies = () => {
    CookieManager.clearAll(true);
  };

  /**
   * This function clears all cookies and console.logs the result
   */
  const softClearCookies = async () => {
    await CookieManager.clearAll();
  };

  /**
   * This function gets the sp_dc cookie and returns its value as a string.
   * @param {none}
   * @returns {string|null} - The value of the sp_dc cookie or null if not found.
   */
  const getSpDcCookie = async () => {
    try {
      const cookies = await CookieManager.getAll(true);

      if (cookies?.sp_dc?.value) {
        return cookies.sp_dc.value;
      } else {
        console.log('sp_dc cookie not found');
        return null;
      }
    } catch (error) {
      // Handle errors if encountered during the process
      console.error('Error retrieving sp_dc cookie:', error);
      return null;
    }
  };

  /**
   * This function gets the access_token and returns it as a string.
   * @param {string} sp_dc
   */
  const getAccessToken = async sp_dc => {
    await softClearCookies();

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

      const jsonResult = await response.json();
      const accessToken = jsonResult.accessToken;

      return accessToken;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  /**
   * This function retrieves the user's profile information using the access token.
   * @param {string} access_token - The Spotify access token.
   * @returns {Array} - An array containing the user's display name and profile photo URL.
   */
  const getUserProfile = async access_token => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.spotify.com/v1/me',
      requestOptions,
    );

    const responseJson = await response.json();
    const displayName = await responseJson.display_name;
    const profilePhoto = await responseJson.images[0].url;

    return [displayName, profilePhoto];
  };

  const getUserPlaylist = async (access_token, href, type) => {
    if (type === 'playlist') {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${access_token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(href, requestOptions);

      const responseJson = await response.json();
      const isPublic = await responseJson.public;
      const playlistName = await responseJson.name;

      return [isPublic, playlistName];
    }

    return [false, 'album'];
  };

  /**
   * This function gets the user's activity using the access token and user info.
   * @param {string} access_token - The Spotify access token.
   * @param {Array} userInfo - An array containing user information (assumed to contain name and email).
   * @returns {You} - An object representing the user's recent activity.
   */
  const getYourActivity = async (access_token, userInfo) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played',
      requestOptions,
    );

    const parsedData = await response.json();
    const firstTrack = await parsedData.items[0];
    const played_at = await firstTrack.played_at;
    const track = await firstTrack.track;

    let firstTrackContext;
    let href;

    if (firstTrack.context !== null) {
      firstTrackContext = await firstTrack.context.type;
      href = await firstTrack.context.href;
    }
    else {
      firstTrackContext = {
        "type" : "album"
      };
      href = firstTrack.track.href;
    }

    const playlistInfo = await getUserPlaylist (
      access_token,
      href,
      firstTrackContext
    );

    const youObj = new You(
      played_at,
      track,
      userInfo[0],
      userInfo[1],
      firstTrackContext,
      playlistInfo[0],
      playlistInfo[1],
    );

    // Set the user's recent activity using the youObj (assumed to be defined)
    setYourActivity(youObj);
    return youObj;
  };

  /**
   * This function will take in the access_token cookie as a parameter and return the user's activity as a string.
   * @param {string} access_token
   */
  const getActivity = async access_token => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://guc-spclient.spotify.com/presence-view/v1/buddylist',
        requestOptions,
      );

      const result = await response.text();
      return result;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  /**
   * This function parses the friend activity data and returns an array of Friend objects.
   * @param {string} friendActivity - The JSON string containing friend activity data.
   * @returns {Array} - An array of Friend objects.
   */
  const parseFriendActivity = friendActivity => {
    try {
      if (!friendActivity) {
        console.log('Friend activity is undefined.');
        return;
      }

      // Parse the JSON data
      const parsedData = JSON.parse(friendActivity);
      const friends = parsedData.friends;
      let localFriendsArray = [];

      // Reverse the friends array and convert each friend to a Friend object
      friends.reverse().forEach(friend => {
        const friendObj = new Friend(
          friend.timestamp,
          friend.user,
          friend.track,
        );
        localFriendsArray.push(friendObj);
      });

      // Set the parsed friend activity
      setFriendsArray(localFriendsArray);

      // Return the parsed friend activity
      return localFriendsArray;
    } catch (error) {
      // Handle parsing errors
      console.error('Error parsing friend activity:', error);
    }
  };

  /**
   * Wrap the context value in useMemo to optimize rendering
   */
  const memoizedValue = useMemo(
    () => ({
      getSpDcCookie,
      getAccessToken,
      getActivity,
      hardClearCookies,
      softClearCookies,
      getCookies,
      parseFriendActivity,
      masterGetActivity,
      friendsArray,
      getYourActivity,
      yourActivity,
      getUserProfile,
    }),
    [yourActivity, friendsArray],
  );

  return (
    <BackendContext.Provider value={memoizedValue}>
      {children}
    </BackendContext.Provider>
  );
};

export default BackendProvider;
