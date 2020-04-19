const type = document.querySelectorAll('.radio')
let api = 'YOUR_API_KEY'
const key = document.querySelector('.artist_name_search')
let con = document.querySelector('.results_con')

{
    $('.artist_results').hide()
}

document.querySelector('.search_artist').addEventListener('click' , () => {
    if(key.value != '') {
        type[1].checked ? apiCall(key.value,'q_artist' , 100) : apiCall(key.value,'q_track' , 10)
    }
    else key.classList.add('empty')
})


function apiCall(name, type, size) {
    key.value = ''
    $('.artist_results').show()
    $('.artist_results').text(`Searching For : ${name}`)

    url = `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?${type}=${name}&s_artist_rating=desc&page_size=${size}&apikey=${api}`
    
    console.log(url)

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            tracks = data['message']['body']['track_list']
            con.innerHTML = ('')
            if(tracks.length) {
                tracks.forEach(track => {
                    div = document.createElement('div')
                    div.classList.add('track')
                    r  = `<div class="track_name"><a href="/track/${track['track']['artist_name']}/${track['track']['track_name']}">${track['track']['track_name']}</a></div>`
                    r += `<p class="track_artist_name">Artist : ${track['track']['artist_name']}</p>`
                    r += `<p class="track_artist_album">Album : ${track['track']['album_name']}</p>`
                    r += `<span>Rating : ${track['track']['track_rating']}</span>`
                    div.innerHTML = r
                    con.appendChild(div)
                })
            }
            else con.innerText('No Results')
        })
}