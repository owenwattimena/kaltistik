import { TopNav } from './TopNav.js'
import { TidakBerkelompok } from './disversi/TidakBerkelompok.js'
import { Berkelompok } from './disversi/Berkelompok.js'
import { SimpanganBaku } from './disversi/SimpanganBaku.js'

export const Disversi = {
    template: `
        <div>
            <top-nav title="Disversi"></top-nav>
            <div class="container p-3">
                <div class="row"> 
                    <tidak-berkelompok></tidak-berkelompok>
                    <berkelompok></berkelompok>
                    <simpangan-baku></simpangan-baku>
                </div>
            </div>
        </div>
    `,
    components: {
        'top-nav': TopNav,
        'tidak-berkelompok': TidakBerkelompok,
        'berkelompok': Berkelompok,
        'simpangan-baku': SimpanganBaku,
    }
}