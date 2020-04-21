import { TopNav } from './TopNav.js'
import { Koefisien } from './koefisien/Koefisien.js'

export const KoefisienRelasi = {
    template: `
        <div>
            <top-nav title="Koefesien Relasi"></top-nav>
            <div class="container p-3">
                <div class="row"> 
                    <koefisien></koefisien>
                </div>
            </div>
        </div>
    `,
    components: {
        'top-nav': TopNav,
        'koefisien': Koefisien,
    }
}