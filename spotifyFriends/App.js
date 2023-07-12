import * as React from "react";
import * as WebBrowser from "expo-web-browser";
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
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "942c1e8214364434a9317b79856493dc",
      scopes: ["user-read-email", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "spotifyFriends://",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
    }
  }, [response]);

  return (
    <>
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
    </>
  );
}
