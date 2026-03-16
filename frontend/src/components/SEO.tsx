import { Helmet } from 'react-helmet-async'

interface Props {
    title: string
    description: string
    path?: string
}

const BASE_URL = 'https://gate-tracker-wzwf.vercel.app'
const OG_IMAGE = `${BASE_URL}/og-image.svg`

export default function SEO({ title, description, path = '' }: Props) {
    const url = `${BASE_URL}${path}`
    const fullTitle = `${title} | GateTracker`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />
        </Helmet>
    )
}
