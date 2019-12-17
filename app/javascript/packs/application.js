import "bootstrap";

// const url = "/api/v1/current_user/playlists";
// const result = fetch(url, { credentials: "same-origin" })
//           .then(response => response.json())
//           .then((data) => {
//             console.log(data);
//           })

const url2 = "/api/v1/current_user/playlists/52/songs";
const result2 = fetch(url2, { credentials: "same-origin" })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          })
