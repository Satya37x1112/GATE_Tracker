import { Helmet } from 'react-helmet-async'

interface Props {
    title: string
    description: string
    path?: string
}

const BASE_URL = 'https://gate-tracker-wzwf.vercel.app'

export default function SEO({ title, description, path = '' }: Props) {
    const url = `${BASE_URL}${path}`
    const fullTitle = `${title} | GateTracker`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}
