const name = document.querySelector('.artist_name_search')
let api = 'YOUR_API_KEY'
const con = document.querySelector('.artist_names_con')
{
    $('.artist_results').hide()
}

document.querySelector('.search_artist').addEventListener('click' , () => {
    name.classList.remove('empty')
    if(name.value != '') {
        $('.artist_results').show()
        $('.artist_results').text(`Searching For : ${name.value}`)

        fetch(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${name.value}&apikey=${api}&page_size=10`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                con.innerHTML = ''
                if(data['message']['header']['status_code'] == 200) {
                    artists = data['message']['body']['artist_list']
                    if(artists.length) {
                        artists.forEach(artist => {
                            div = document.createElement('div')
                            div.classList.add('artist')
                            r  = `<p class="artist_name">${artist['artist']['artist_name']}</p>`
                            r += `<p class="artist_rating"><a class="artist_r" href='/artist/${artist['artist']['artist_name']}/${artist['artist']['artist_id']}'>Album</a> Rating : ${artist['artist']['artist_rating']}</p>`                
                            div.innerHTML = r
                            con.appendChild(div)
                        })
                    }
                    else con.innerText = 'No Results.' 
                }
                else con.innerText = 'No Results.'
            })
        
        name.value = ''
    }
    else 
        name.classList.add('empty')
})