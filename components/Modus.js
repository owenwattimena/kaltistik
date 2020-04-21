import { TopNav } from './TopNav.js'
import { TidakBerkelompok } from './modus/TidakBerkelompok.js'
import { Berkelompok } from './modus/Berkelompok.js'
export const Modus = {
    template: `
        <div>
            <top-nav title="Modus"></top-nav>
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