import reqwest from 'reqwest'

const EMPTY_USER = {
  id: null,
  name: null,
  avatar: null,
  email: null,
  phone_num: null,
  jwt_token: null
}

export var GLOBAL_USER = EMPTY_USER;
export var GLOBAL_SPACE = ''

// save user to storage.null user means to delete saved user.
export function setCurrentUser (user, remember) {
  GLOBAL_USER = user

  if (!(user && user.jwt_token)){
    localStorage && localStorage.removeItem('current_user')
    sessionStorage && sessionStorage.removeItem('current_user')
    return
  }

  // sessionStorage && sessionStorage.setItem('current_user', JSON.stringify(user))
  // return

  localStorage && localStorage.setItem('current_user', JSON.stringify(user))
}

// save user to storage.null user means to delete saved user.
export function removeCurrentUser() {
  localStorage && localStorage.removeItem('current_user')
  sessionStorage && sessionStorage.removeItem('current_user')
}

// temp useed in native app code.
export function saveUserInfo (user) {
  GLOBAL_USER = user
}

export function saveSpace (space) {
  GLOBAL_SPACE = space
}

export function getCurrentUser() {
  return GLOBAL_USER;
}

export function preventDefaultPropagation (e) {
  e.stopPropagation()
  e.preventDefault()
}

export function isNullOfObject (obj) {
  if (!obj) {
    return false
  }

  var keys = Object.keys(obj)
  if (!keys.length) {
    return false
  }

  return keys
}

export const isDevEnv = () => {
    return process.env.NODE_ENV === 'development'
}

export const getObjOfArray = (list = []) => {
  let obj = {}

  list.forEach(json => {
    obj[json.id] = json
  })

  return obj
}

/**
* Base64 encode / decode
**/
const Base64 = {
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },

  // public method for decoding
  decode : function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64._utf8_decode(output);

      return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
      let c1 = '' 
      let c2 = ''
      let c3 = ''
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while ( i < utftext.length ) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i+1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i+1);
              c3 = utftext.charCodeAt(i+2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }
      return string;
  }
}

// 埋点
export const track = async (eventName) => {
  try {
    const base64 = Base64.encode(JSON.stringify({
      event : eventName,
      properties : {
        // user_id : data.user && data.user.id,
        // token : '9c0370c8b02cd3f0b53f9ad98f8f8ebf',
        token : 'ad1a2509f8e665a06ff320a76bd87dba',
        "Referred By": "desktop app"
      }
    }))
    reqwest({
        url: 'https://api.mixpanel.com/track/'
      , method: 'GET'
      , data: {data: base64}
      , error: function (err) {
        console.warn(`Failed to track mixpanel: ${err}`)
      }
      , success: function (resp) {
        console.debug(`Mixpanel tracked: ${eventName}`)
      }
    })
  } catch (e) {
    console.warn(`Failed to track mixpanel: ${e}`)
  }
}

export const parseUrl = (url) => {
  if (!url) {
    return ''
  }

  url = decodeURIComponent(url)
// remove any preceding url and split
  url = url.substring(url.indexOf('?')+1).split('&');

  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = url.length - 1; i >= 0; i--) {
    pair = url[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
}