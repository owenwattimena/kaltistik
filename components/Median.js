import { TopNav } from './TopNav.js'
import { TidakBerkelompok } from './median/TidakBerkelompok.js'
import { Berkelompok } from './median/Berkelompok.js'

export const Median = {
    template: `
        <div>
            <top-nav title="Median"></top-nav>
            <div class="container p-3">
                <div class="row">
                    <tidak-berkelompok></tidak-berkelompok>
                    <berkelompok></berkelompok>
                </div>
            </div>
        </div> 
    `,
    components: {
        'top-nav': TopNav,
        'tidak-berkelompok': TidakBerkelompok,
        'berkelompok': Berkelompok,
    }
}