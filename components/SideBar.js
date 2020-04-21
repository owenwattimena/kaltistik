export const SideBar = {
    template: `
        <div class="side-nav text-center">
            <div class="side-nav-header py-4">
                <button id="hide-menu" @click="hide_menu">
                    <span class="side-nav-toggler-icon"></span>
                </button>
                <img src="asset/img/statistik.png">
                <h3 class="mt-3 font-primary-dark"><a href="index.html">KalTistik</a></h3>
            </div>
            <div class="side-nav-content pt-3 text-light">
                
                <p>Materi</p>
                <div class="separator"></div>
                <div class="list-group">
                    <router-link to="/" exact class="list-group-item list-group-item-action" >Rata-rata Hitung</router-link>
                    
                    <router-link to="/tabel-distribusi-frekuensi" exact class="list-group-item list-group-item-action " >Tabel Distribusi Frekuensi</router-link>
                    
                    <router-link to="/median" exact class="list-group-item list-group-item-action " >Median</router-link>
                    
                    <router-link to="/modus" exact class="list-group-item list-group-item-action " >Modus</router-link>
                    
                    <router-link to="/disversi" exact class="list-group-item list-group-item-action " >Disversi</router-link>
                    
                    <router-link to="/koefisien-relasi" exact class="list-group-item list-group-item-action " >Koefisien Relasi</router-link>
                </div>
            </div>
        </div>
    `,
    methods: {
        hide_menu: function () {
            $(".side-nav").toggleClass('open');
        }
    },
    mounted() {
        $("#app .list-group-item").click(function () {
            $(".side-nav").toggleClass('open');
        })
    }

}