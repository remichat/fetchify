import "bootstrap";
// import "../new_download";

const url = "/api/v1/current_user/playlists";
let playlist_id = 0
const result = fetch(url, { credentials: "same-origin" })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            playlist_id = data[7].id
          })
          .then(() => { secondCallBack() })

const secondCallBack = () => {
  const url2 = `/api/v1/current_user/playlists/${playlist_id}/songs`;
  const result2 = fetch(url2, { credentials: "same-origin" })
            .then(response => response.json())
            .then((data) => {
              console.log(data);
            })
}
