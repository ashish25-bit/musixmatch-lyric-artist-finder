{
    url = window.location.href
    array = url.split('/')
    let api = 'YOUR_API_KEY'

    fetch(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${array[5].trim()}&page=1&page_size=100&apikey=${api}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            tracks = data['message']['body']['track_list']
            $('.album_head').text(tracks[0]['track']['album_name'])
            tracks.forEach(track => {
                div = document.createElement('div')
                div.classList.add('track')
                r = `<div class="track_name"><a href="/track/${array[4].trim()}/${track['track']['track_name']}">${track['track']['track_name']}</a></div><span>Rating : ${track['track']['track_rating']}</span>`
                div.innerHTML = r
                document.querySelector('.tracks_con').appendChild(div)
            })
        })
}