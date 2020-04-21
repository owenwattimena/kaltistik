export const Footer = {
    props: ['official_website'],
    template: `
        <footer>
            <p class="text-center">
                <a :href="official_website" target="_blank">
                    Copy Right By Wentox
                </a>
            </p>
        </footer>
    `
}