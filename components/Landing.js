import { Footer } from './Footer.js'

export const Landing = {

    template: `
        <div class="landing px-2">
            <div class="container text-center font-primary-dark">
                <img src="asset/img/statistik.png" alt="" class="py-5 px-2">
                <h1>Selamat Datang di Aplikasi KalTistik v2  </h1>
                <p class="description">
                    Kalkulator Statistik berdasarkan mata kuliah Statistika dan Probabilitas</br>
                    Program studi Teknik Informatika</br>
                    Jurusan Teknik Elektro</br>
                    Politeknik Negeri Ambon</br>
                    2019
                </p>
                <a href="" @click.prevent="$emit('click', false)" class="btn btn-primary px-5 my-5">MULAI</a>

                <footer_ official_website="https://owenwattimena.github.io"></footer_>

            </div>
        </div>
    `,
    components: {
        'footer_': Footer
    }
}