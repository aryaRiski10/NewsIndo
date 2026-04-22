export async function getSource() {
    try {
        const res = await fetch('https://berita-indo-api.vercel.app')
        const data = await res.json()
        return data.listApi
    } catch (error) {
        console.error('Error fetching data:', error);
        return {}
    }

}

export async function getAllNews(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data.data
    } catch (error) {
        console.error('Error fetching news:', error);
        return []
    }
}

export async function loaderSource() {
    const dataSources = await getSource();
    const topSources = Object.fromEntries(Object.entries(dataSources).slice(0, 4))
    // setSources(topSources);

    const allUrls = Object.entries(topSources).map(([key, value]) => value.all).flat()
    // setAllUrls(allUrls);
    const getNews = await Promise.all(
        allUrls.map((url) => getAllNews(url))
    )
    const category = (news) => {
        try {
            if (news.link.includes('cnn') || (news.link.includes('cnbc'))) {
                return new URL(news.link).pathname.split('/')[1]
            } else if (news.link.includes('tempo')) {
                return new URL(news.link).hostname.split('.')[0]
            } else if (news.link.includes('republika')) {
                return news.categories
            } else {
                return "Lainnya"
            }
        } catch (error) {
            console.error('Error parsing URL:', error);
        }
    }
    const dataNews = getNews.flat().map((news, index) => {

        return {
            category: category(news),
            ...news
        }
    })

    return {
        sources: topSources,
        allUrls: allUrls,
        allNewsSource: dataNews
    }
}

export async function loaderBySource({ params }) {
    const dataBySource = await fetch(`https://berita-indo-api.vercel.app/v1/${params.sourceName}`)
    const data = (await dataBySource.json()).data;
    const category = (news) => {
        try {
            if (news.link.includes('cnn') || (news.link.includes('cnbc'))) {
                return new URL(news.link).pathname.split('/')[1]
            } else if (news.link.includes('tempo')) {
                return new URL(news.link).hostname.split('.')[0]
            } else if (news.link.includes('republika')) {
                return news.categories
            } else {
                return "Lainnya"
            }
        } catch (error) {
            console.error('Error parsing URL:', error);
        }
    }
    const dataNewsBySource = data.map((news, index) => {
        return {
            category: category(news),
            ...news
        }
    })
    return { dataNews: dataNewsBySource };
}