import React, { useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import Friend from "./Models"
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { Button, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function App() {
  const [webAccessToken, setWebAccessToken] = useState(null);
  const [friendActivity, setFriendActivity] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "942c1e8214364434a9317b79856493dc",
      scopes: ["user-read-email", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "https://www.google.com",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
    }
  }, [response]);

  const getAccessToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "sp_dc=AQABbS-f7lknfF0z12vLlBo6trJZy0_SoEzSrXp3sqBm02FTDw0zi27g0iqJyHx4Sx5r4QVBEgkdcbXAiSG1r2oZxJJO-ny1CifPUFXXR2ZLRAJRyR72JaYHpj-CW9cCQ6qWBPn2WhRSCByvaEEd-ltUqx6W4x7c; sp_t=6bcde1423680832d71e3996fe4457a08"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://open.spotify.com/get_access_token?reason=transport&productType=web_player",
        requestOptions
      );
  
      const result = await response.json();
      const accessToken = result.accessToken;
      setWebAccessToken(accessToken);
    } catch (error) {
      console.log("error", error);
    }

  };

  const getFriendActivity = async () => {
    var myHeaders = new Headers();
    console.log("here: ", webAccessToken)
    myHeaders.append("Authorization", `Bearer ${webAccessToken}`);
    myHeaders.append("Cookie", "sp_t=ee577364167bc472a3d4fdf5d65c9316");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        "https://guc-spclient.spotify.com/presence-view/v1/buddylist?reason=transport&productType=web_player&Cookie=sp_dc= m9imVUYoY3Zm5RkPVV3-VI4FM3Teg6kjTliCg5zLm_tav", 
        requestOptions
      );
  
      const result = await response.json();
      setFriendActivity(result);
    } catch (error) {
      console.log("error", error);
    }
  }

  const parseFriendActivity = async () => {
    const friends = friendActivity.friends;
    for (const friend of friends) {
      const friendObj = new Friend(friend.timestamp, friend.user, friend.track);

      console.log("Friend:", friendObj.user.name);
      console.log("TimeStamp:", friendObj.timestamp);
      console.log("Track:", friendObj.track.name);
      console.log("Album:", friendObj.track.album.name);
      console.log("Artist:", friendObj.artist.name);
      console.log("----------------------------------");
    }
  }

  return (
    <>
      <Text>PLACE HOLDER</Text>
      <Text>PLACE HOLDER</Text>
      <Text>PLACE HOLDER</Text>
      <Text>PLACE HOLDER</Text>
      <Text>PLACE HOLDER</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Button
        title="Call API"
        onPress={() => {
          getAccessToken();
        }}
      />
      <Button 
        title = "Get Activity"
        onPress={() => {
          getFriendActivity();
        }}
      />
       <Button 
        title = "Parse Activity"
        onPress={() => {
          parseFriendActivity();
        }}
      />
    </>
  );
}
