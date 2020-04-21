import { TopNav } from './TopNav.js'
import { RerataParameter } from './rerata-hitung/RerataParameter.js'
import { RerataEstimate } from './rerata-hitung/RerataEstimate.js'
import { RerataBerkelompok } from './rerata-hitung/RerataBerkelompok.js'
import { RerataBerkelompokKelasInterval } from './rerata-hitung/RerataBerkelompokKelasInterval.js'

export const RerataHitung = {
    template: `
        <div>
            <top-nav title="Rata-rata Hitung"></top-nav>
            <div class="container p-3">
                <div class="row">
                    <rerata-parameter></rerata-parameter>
                    <rerata-estimate></rerata-estimate>
                    <rerata-berkelompok></rerata-berkelompok>
                    <rerata-berkelompok-kelas-interval></rerata-berkelompok-kelas-interval>
                </div>
            </div>
        </div>
    `,
    components: {
        'top-nav': TopNav,
        'rerata-parameter': RerataParameter,
        'rerata-estimate': RerataEstimate,
        'rerata-berkelompok': RerataBerkelompok,
        'rerata-berkelompok-kelas-interval': RerataBerkelompokKelasInterval,
    }
}