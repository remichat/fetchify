import "bootstrap";

const url = "/api/v1/current_user/playlists";
const result = fetch(url, { credentials: "same-origin" })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          })
