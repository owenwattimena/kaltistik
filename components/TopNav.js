export const TopNav = {
    data() {
        return {
            tinggi: 0
        }
    },
    props: ['title'],
    template: `
        <div class="top-nav px-2">
            <button id="show-menu" @click="show_menu">
                <span class="top-nav-toggler-icon"></span>
            </button>
            <h3 class="font-primary"> {{title}} </h3>
        </div>
    `,
    methods: {
        show_menu: function () {
            $("#app .side-nav").toggleClass('open');
            let $tinggi_content = $('#app .body .content').height();
            if ($tinggi_content > this.tinggi) {
                $('.side-nav').css('min-height', $tinggi_content);
            }
            else {
                $('.side-nav').css('min-height', '100%');
            }
        }
    },
    mounted() {
        this.tinggi = $('#app .body .content').height();
    }
}