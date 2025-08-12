import React from "react";
import { Link } from "react-router-dom";
import'./LandingPage.css'

// const url = 'https://www.autonomosyemprendedor.es/media/autonomosyemprendedor/images/2023/03/29/2023032917453731776.jpg';
// const url2 = 'https://media.revistagq.com/photos/645dde361c98f4b147443172/16:9/pass/100%20mejores%20videojuegos%20gq.png';
const url3 = 'https://evelongames.com/wp-content/uploads/2022/11/Kratos-portada-1536x864.jpg';
const url4 = 'https://assetsio.reedpopcdn.com/139765141361.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp';
const url5 = 'https://www.egames.news/__export/1683919323424/sites/debate/img/2023/05/12/spider-man-insomniac-games-sony-1.jpg_554688468.jpg';
const url6 = 'https://www.mundodeportivo.com/alfabeta/hero/2023/04/hd-wallpaper-the-black-suit-spiderman-spiderman-superheroes-artist-artwork-digital-art-deviantart.jpg?width=1200';
const url7 = 'https://images7.alphacoders.com/129/1292770.png';
const url8 = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/10/assassins-creed-2115643.jpg?tf=3840x';
const url9 = 'https://malditosnerds.com/wp-content/uploads/2022/10/uncharted-portada-750x405jpg-copyjpg.jpg';
const url10 = 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/04/The-Last-of-Us-Remake-PS5-1.jpg';
const url11 = 'https://i.blogs.es/aaa129/1136691/1366_2000.jpeg';
const url12 = 'https://assetsio.reedpopcdn.com/Batman-Arkham-Knight2.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp';
const url13 = 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/EMGRLDPUQRCBJL243GN5HZGNMM.jpg';
const url14 = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2012/03/153759-fifa-street-golea-reino-unido.jpg?tf=3840x';
const url15 = 'https://images.pushsquare.com/676898d548e1f/littlebigplanet.large.jpg';
const url16 = 'https://c4.wallpaperflare.com/wallpaper/601/497/256/video-games-infamous-wallpaper-preview.jpg';
const img = 'https://guitar.com/wp-content/uploads/2024/03/Ed-Sheeran-3@2000x1500-696x522.jpg';

class LandingPage extends React.Component{

//   <main>
//     <section id="featured">
//         <h2>Destacados</h2>
//         <div class="music-grid">
//             <!-- Aquí irán las canciones -->
//         </div>
//     </section>
//     <section id="new-arrivals">
//       <h2>Nuevas Llegadas</h2>
//       <div class="music-grid">
//           <!-- Aquí irán las canciones de nuevas llegadas -->
//       </div>
//     </section>
//     <section id="genres">
//       <h2>Géneros</h2>
//       <div class="genre-list">
//           <div class="genre-item" style="background-image: url('que onda!');">
//               <span>Pop</span>
//           </div>
//           <div class="genre-item" style="background-image: url('img/rock.jpg');">
//               <span>Rock</span>
//           </div>
//           <div class="genre-item" style="background-image: url('img/jazz.jpg');">
//               <span>Jazz</span>
//           </div>
//           <div class="genre-item" style="background-image: url('img/hiphop.jpg');">
//               <span>Hip Hop</span>
//           </div>
//           <!-- Puedes agregar más géneros aquí -->
//       </div>
//   </section>
  
//     <section id="genres">
//       <h2>Géneros</h2>
//       <div class="genre-list">
//           <div class="genre-item">Pop</div>
//           <div class="genre-item">Rock</div>
//           <div class="genre-item">Jazz</div>
//           <div class="genre-item">Hip Hop</div>
//           <!-- Agregar más géneros según lo necesites -->
//       </div>
//     </section>
//     <section id="artists">
//       <h2>Artistas Destacados</h2>
//       <div class="music-grid">
//           <!-- Aquí irán los artistas destacados -->
//       </div>
//     </section>
//     <section id="special-offers">
//       <h2>Ofertas Especiales</h2>
//       <div class="music-grid">
//           <!-- Aquí irán las ofertas especiales o canciones en descuento -->
//       </div>
//     </section>
//     <section id="top-charts">
//       <h2>Top Charts</h2>
//       <div class="music-grid">
//           <!-- Aquí irán las canciones más populares -->
//       </div>
//     </section>
    
//   </main>


    render() {
        return(
            <div className="landingpage">
                <div>
                {/* <img className="img" src={url4} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url3} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url9} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url12} alt="Food's Lyon"/> */}
                </div>
                <div>
                {/* <img className="img" src={url5} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url8} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url6} alt="Food's Lyon"/> */}
                </div>
                {/* <button className='home'>
                <Link to="/home">Home</Link>
                </button> */}
                <div>
                <img className="img" src={img} alt="Berry's"/>
                {/* <img className="img" src={url7} alt="Lyon"/> */}
                {/* <img className="img" src={url10} alt="Food's Lyon"/> */}
                </div>
                <div>
                {/* <img className="img" src={url13} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url14} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url15} alt="Food's Lyon"/> */}
                {/* <img className="img" src={url16} alt="Food's Lyon"/> */}
                </div>

            </div>
            

        )
    }

}

export default LandingPage;