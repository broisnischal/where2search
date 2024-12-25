
const searchEngines: SearchEngines[] = [
    {
        id: "chatgpt",
        title: "Ask ChatGPT",
        url: "https://chat.openai.com/search?q="
    },
    { id: "google", title: "Google", url: "https://www.google.com/search?q=" },
    { id: "reddit", title: "Reddit", url: "https://www.reddit.com/search/?q=" },
    { id: "github", title: "GitHub", url: "https://github.com/search?q=" },
    { id: "grep", title: "Grep App", url: "https://grep.app/search?q=" },
    { id: "twitter", title: "Twitter", url: "https://twitter.com/search?q=" },
    {
        id: "youtube",
        title: "YouTube",
        url: "https://www.youtube.com/results?search_query="
    }
]

const othersSearches: SearchEngines[] = [
    {
        id: "linkedin",
        title: "LinkedIn",
        url: "https://www.linkedin.com/search/results/all/?keywords="
    },

    {
        id: "wikipedia",
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Special:Search?search="
    },
    {
        id: "medium",
        title: "Medium",
        url: "https://medium.com/search?q="
    },
    {
        id: "quora",
        title: "Quora",
        url: "https://www.quora.com/search?q="
    },
    {
        id: "amazon",
        title: "Amazon",
        url: "https://www.amazon.com/s?k="
    }

]

const developmentSearches: SearchEngines[] = [
    {
        id: "stackoverflow",
        title: "Stack Overflow",
        url: "https://stackoverflow.com/search?q="
    },
    {
        id: "npm",
        title: "NPM",
        url: "https://www.npmjs.com/search?q="
    },
    {
        id: "docker",
        title: "Docker Hub",
        url: "https://hub.docker.com/search?q="
    },
    {
        id: "mdn",
        title: "MDN",
        url: "https://developer.mozilla.org/en-US/search?q="
    },
    {
        id: "devdocs",
        title: "DevDocs",
        url: "https://devdocs.io/#q="
    }
]

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "where2search",
        title: "Where2Search",
        contexts: ["selection"],
    });

    searchEngines.forEach((engine) => {
        chrome.contextMenus.create({
            id: engine.id,
            title: engine.title,
            contexts: ["selection"],
            parentId: "where2search",
        })
    })

    chrome.contextMenus.create({
        id: "others",
        title: "Others",
        contexts: ["selection"],
        parentId: "where2search",
    })

    othersSearches.forEach((engine) => {
        chrome.contextMenus.create({
            id: engine.id,
            title: engine.title,
            contexts: ["selection"],
            parentId: "others",
        })
    })

    chrome.contextMenus.create({
        id: "development",
        title: "Development",
        contexts: ["selection"],
        parentId: "where2search",
    })

    developmentSearches.forEach((engine) => {
        chrome.contextMenus.create({
            id: engine.id,
            title: engine.title,
            contexts: ["selection"],
            parentId: "development",
        })
    })
})

chrome.contextMenus.onClicked.addListener((info) => {
    if (!info.selectionText) return;

    const engine = [...searchEngines, ...othersSearches, ...developmentSearches].find((e) => e.id === info.menuItemId);

    if (engine) {
        const queryUrl = engine.url + encodeURIComponent(info.selectionText);
        chrome.tabs.create({ url: queryUrl });
    }
});