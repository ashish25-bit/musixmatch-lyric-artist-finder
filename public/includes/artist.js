{
    url = window.location.href
    array = url.split('/')
    ana = array[4].split('%20')
    name = ''
    ana.forEach(n => name += n + ' ') 
    $('.artist_head').text(`Albums by : ${name.trim()}`)

    let api = 'YOUR_API_KEY'
    id = parseInt(array[5].trim())

    fetch(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${id}&s_release_date=desc&page_size=100&apikey=${api}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            document.querySelector('.album_con').innerHTML = ''
            if(data['message']['header']['status_code'] == 200) {
                albums = data['message']['body']['album_list']

                albums.forEach(album => {
                    div = document.createElement('div')
                    div.classList.add('album')
                    r  = `<div class="album_name">
                    <a href='/album/${array[4].trim()}/${album['album']['album_id']}'>${album['album']['album_name']}</a>
                    </div>`
                    r += `<span>Release Date : ${album['album']['album_release_date']}</span>
                    <span>Rating : ${album['album']['album_rating']}</span>`
                    div.innerHTML = r
                    document.querySelector('.album_con').appendChild(div)
                })
            }
            else 
                document.querySelector('.album_con').innerHTML = 'No Results'
        })
}