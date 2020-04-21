import { TopNav } from './TopNav.js'
import { PenyajianTabelDistribusi } from './tabel-distribusi/PenyajianTabelDistribusi.js'
export const TabelDistribusi = {
    template: `
        <div>
            <top-nav title="Tabel Distribusi Frekuensi"></top-nav>
            <div class="container p-3">
                <div class="row"> 
                    <tabel-distribusi></tabel-distribusi>
                </div>
            </div>
        </div> 
    `,
    components: {
        'top-nav': TopNav,
        'tabel-distribusi': PenyajianTabelDistribusi,
    }
}