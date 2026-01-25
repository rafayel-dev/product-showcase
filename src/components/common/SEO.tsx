import React from 'react';
import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    type?: string;
    name?: string;
    image?: string;
    children?: ReactNode;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    type = 'website',
    name = 'Product Showcase',
    image,
    children
}) => {
    const siteUrl = window.location.origin;
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | {name}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={name} />
            <meta property="og:url" content={fullCanonical} />
            {fullImage && <meta property="og:image" content={fullImage} />}

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {fullImage && <meta name="twitter:image" content={fullImage} />}

            {children}
        </Helmet>
    );
}

export default SEO;
