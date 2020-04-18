{
    url = window.location.href
    array = url.split('/')
    na = array[4].split('%20')
    artist = ''
    na.forEach(n => artist += n+' ')
    ns = array[5].split('%20')
    song = ''
    ns.forEach(s => song += s+' ')
    $('.track_head').text(`${artist.trim()} - ${song.trim()}`)

    fetch(`https://api.lyrics.ovh/v1/${array[4]}/${array[5]}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            
            $('.track_lyric p').text( data['lyrics'] ? data['lyrics'] : 'No Lyrics Found')
        })
}