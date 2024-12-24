
const searchEngines: SearchEngines[] = [
    { id: "google", title: "Google", url: "https://www.google.com/search?q=" },
    { id: "reddit", title: "Reddit", url: "https://www.reddit.com/search/?q=" },
    { id: "github", title: "GitHub", url: "https://github.com/search?q=" },
    { id: "grep", title: "Grep App", url: "https://grep.app/search?q=" },
    { id: "twitter", title: "Twitter", url: "https://twitter.com/search?q=" }
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
            parentId: "where2search"
        })
    })
})

chrome.contextMenus.onClicked.addListener((info) => {
    if (!info.selectionText) return; // Exit if no text is selected

    console.log(info);

    const engine = searchEngines.find((e) => e.id === info.menuItemId);
    if (engine) {
        const queryUrl = engine.url + encodeURIComponent(info.selectionText);
        chrome.tabs.create({ url: queryUrl });
    }
});