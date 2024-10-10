/*****************************************************
 *
 *    Globally assigned variables
 *
 ******************************************************/

let clientID = "secrets secrets";
let clientSecret = "secrets secrets";

let strAccessToken = "";
let token_type = "";
let tokenExpiresIn = "";

// let pageSize = 100;
let url = "https://missisquoi.powerschool.com/ws/v1/student";

/*****************************************************
 *
 *    FUNCTION: getConnection()
 *    This function will make the request for a token
 *    from the PS server and store it, the type, and the
 *    expiration time in their global variables
 *
 ******************************************************/
function getConnection() {
  let authUrl = "https://missisquoi.powerschool.com/oauth/access_token";
  let options = {
    method: "post",
    headers: {
      Authorization:
        "Basic " + Utilities.base64Encode(clientID + ":" + clientSecret),
    },
    payload: {
      grant_type: "client_credentials",
    },
    muteHttpExceptions: true,
  };
  let response = UrlFetchApp.fetch(authUrl, options);
  let data = JSON.parse(response.getContentText());

  strAccessToken = data.access_token;
  token_type = data.token_type;
  tokenExpiresIn = data.expires_in;

  Logger.log(strAccessToken);
}

/*****************************************************
 *
 *    FUNCTION: getCurrentPSSectionEnrollments()
 *
 ******************************************************/

function getCurrentPSSectionEnrollments() {
  if (strAccessToken == "") {
    getConnection();
  }

  let options = {
    method: "post",
    headers: {
      Authorization: token_type + " " + strAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      students: {
        student: [
          {
            client_uid: "4275",
            action: "UPDATE",
            id: "4275",
            _extension_data: {
              _table_extension: [
                {
                  name: "U_STUDENTS_LINKS", // group name
                  _field: [
                    {
                      name: "LINK_504", // field name
                      value: "lets see if this works", // field value
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    }),
    muteHttpExceptions: true,
  };

  let response = UrlFetchApp.fetch(url, options);

  console.log(response.toString());
}
