import latestMusic from './data/latestMusic.json'
import artistsDesc from './data/artistsDetail.json'
import album from './data/album.json'
import oneAlbum from './data/oneAlbum.json'
import topAlbum from './data/topAlbum.json'

export default {
  "GET /api/top/song": latestMusic,
  'GET /api/top/album': topAlbum
  // "GET /api/artist/desc": artistsDesc
  // "GET /api/artist/album": album
  // "GET /api/album": oneAlbum
}

