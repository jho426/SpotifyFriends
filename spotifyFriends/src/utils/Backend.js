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
      const spDcCookie = await getSpDcCookie();

      if (spDcCookie === null) {
        console.log('sp_dc cookie not found');
        return false;
      }

      const accessToken = await getAccessToken(spDcCookie);

      if (accessToken === null) {
        console.log('access_token not found');
        return false;
      }

      const friendActivity = await getActivity(accessToken);

      if (friendActivity === null) {
        console.log('friendActivity not found');
        return false;
      }

      parseFriendActivity(friendActivity);

      const userInfo = await getUserProfile(accessToken);

      if (userInfo === null) {
        console.log('userInfo not found');
        return false;
      }

      // Step 3: Get your own activity using the access token and user profile
      await getYourActivity(accessToken, userInfo);

      // Print a message indicating the process is complete
      console.log('BOOM!');
      return true;
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
   * @returns {string|null} - The value of the sp_dc cookie or null if not found or any issues.
   */
  const getSpDcCookie = async () => {
    try {
      const cookies = await CookieManager.getAll(true);

      // Check if cookies exist and contain the "sp_dc" property with a "value" property.
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
   * @returns {string|null} - The access_token as a string or null if there are any issues.
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

      const jsonResult = await response?.json();
      const accessToken = jsonResult?.accessToken;

      return accessToken || null; // Return null if accessToken is undefined or null.
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  };

  /**
   * This function retrieves the user's profile information using the access token.
   * @param {string} access_token - The Spotify access token.
   * @returns {Array|null} - An array containing the user's display name and profile photo URL, or null if there are any issues.
   */
  const getUserProfile = async access_token => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://api.spotify.com/v1/me',
        requestOptions,
      );

      const responseJson = await response?.json();
      if (!responseJson) {
        console.error('Error parsing response JSON');
        return null;
      }

      const displayName = responseJson.display_name;
      const profilePhoto = responseJson.images?.[0]?.url;

      console.log('profilePhoto:', profilePhoto);

      if (displayName == null) {
        console.error('Error retrieving user profile data');
        return null;
      }

      return [displayName, profilePhoto];
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  };

  /**
   * This function retrieves user playlist information using the access token, href, and type.
   * @param {string} access_token - The Spotify access token.
   * @param {string} href - The URL of the playlist or album.
   * @param {string} type - The type of the item (should be 'playlist' or 'album').
   * @returns {Array|null} - An array containing the playlist's public status and name, or [false, 'album'] if type is not 'playlist'.
   */
  const getUserPlaylist = async (access_token, href, type) => {
    if (type === 'playlist') {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${access_token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(href, requestOptions);

        const responseJson = await response?.json();

        if (!responseJson) {
          console.error('Error parsing response JSON');
          return null;
        }

        const isPublic = responseJson.public;
        const playlistName = responseJson.name;

        if (isPublic == null || playlistName == null) {
          console.error('Error retrieving playlist data');
          return null;
        }

        return [isPublic, playlistName];
      } catch (error) {
        console.error('Error retrieving playlist:', error);
        return null;
      }
    }

    return [false, 'album'];
  };

  /**
   * This function gets the user's activity using the access token and user info.
   * @param {string} access_token - The Spotify access token.
   * @param {Array} userInfo - An array containing user information (assumed to contain name and email).
   * @returns {You|null} - An object representing the user's recent activity, or null if there are any issues.
   */
  const getYourActivity = async (access_token, userInfo) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played',
        requestOptions,
      );

      const parsedData = await response?.json();
      if (!parsedData || !parsedData.items || parsedData.items.length === 0) {
        console.error('Error retrieving recently played data');
        return null;
      }

      const firstTrack = parsedData.items[0];
      if (!firstTrack) {
        console.error('Error retrieving first track data');
        return null;
      }

      const played_at = firstTrack.played_at;
      const track = firstTrack.track;

      let firstTrackContext;
      let href;

      if (firstTrack.context !== null) {
        firstTrackContext = firstTrack.context.type;
        href = firstTrack.context.href;
      } else {
        firstTrackContext = 'album';
        href = firstTrack.track.href;
      }

      const playlistInfo = await getUserPlaylist(
        access_token,
        href,
        firstTrackContext,
      );
      if (playlistInfo === null) {
        console.error('Error retrieving playlist info');
        return null;
      }

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
    } catch (error) {
      console.error('Error retrieving user activity:', error);
      return null;
    }
  };

  /**
   * This function will take in the access_token cookie as a parameter and return the user's activity as a string.
   * @param {string} access_token
   * @returns {string|null} - The user's activity as a string, or null if there are any issues.
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

      const result = await response?.text();
      if (!result) {
        console.error('Error retrieving activity data');
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  /**
   * This function parses the friend activity data and returns an array of Friend objects.
   * @param {string} friendActivity - The JSON string containing friend activity data.
   * @returns {Array|null} - An array of Friend objects, or null if there are any issues.
   */
  const parseFriendActivity = friendActivity => {
    try {
      if (!friendActivity) {
        console.log('Friend activity is undefined.');
        return null;
      }

      // Parse the JSON data
      const parsedData = JSON.parse(friendActivity);
      const friends = parsedData?.friends;
      if (!friends) {
        console.error('Error retrieving friends data');
        return null;
      }

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
      return null;
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
      setFriendsArray,
      setYourActivity,
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
