import sanityClient from '@sanity/client'

const id = process.env.SANITY_STUDIO_API_PROJECT_ID

export default sanityClient({
    projectId: id || '5fwkiotb',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
})