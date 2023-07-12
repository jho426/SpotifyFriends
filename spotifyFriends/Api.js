const fetch = require('node-fetch')

exports.getWebAccessToken = async function getWebAccessToken (spDcCookie) {
  const res = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
    headers: {
      Cookie: `sp_dc=${spDcCookie}`
    }
  })

  return res.json()
}

// exports.getFriendActivity = async function getFriendActivity (webAccessToken) {
//   // Looks like the app now uses `https://spclient.wg.spotify.com/presence-view/v1/buddylist`
//   // but both endpoints appear to be identical in the kind of token they accept
//   // and the response format.
  
//   })

//   return res.json()
// }