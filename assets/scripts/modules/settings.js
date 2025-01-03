const settingsMenu = [
    {
        screenName: "Manage Apps",
        screenIcon: "https://cdn.lordicon.com/fkaukecx.json",
        screenContents: [{
            type: "scriptbox",
            value: function (div) {
                for (let i = 0; i < apps.length;) {
                    div.innerHTML += `<details class="mngappspnl" id="mngapps:${appData[i].url}">
            <summary>
            <img src="${appData[i].icon}"> 
            <span>${appData[i].name}</span> ` +
                        (function () {
                            if (typeof appData[i].desc == "string") {
                                return appData[i].desc;
                            } else {
                                return "No description";
                            }
                        })() +
                        `
            </summary>
            <p>
            <btn onclick="closeApp('${appData[i].url}')">Close app</btn><br>
            <btn onclick="uninstallApp('${appData[i].url}')">Uninstall app</btn>
            </p>
            </details>`;
                    ++i;
                }
            }
        },]
    },
    {
        screenName: "Manage Themes",
        screenIcon: "https://cdn.lordicon.com/depeqmsz.json",
        screenContents: [{
            type: "scriptbox",
            value: function (div) {
                for (let i = 0; i < themes.length;) {
                    div.innerHTML += `<details class="mngthmspnl" id="mngthms:${themeData[i].url}">
            <summary>
            <span>${themeData[i].title}</span> ` +
                        (function () {
                            if (!themeData[i].desc) {
                                return "No description";
                            } else {
                                return themeData[i].desc[1];
                            }
                        })() +
                        `
            </summary>
            <p>
            <btn onclick="moveTheme('${themeData[i].url}','add',-1)">Move Up</btn> <btn onclick="moveTheme('${themeData[i].url}','add',1)">Move Down</btn><br>
            <btn onclick="uninstallTheme('${themeData[i].url}')">Uninstall Theme</btn>
            </p>
            </details>`;
                    ++i;
                }
            }
        },]
    },
    {
        screenName: "Personalization",
        screenIcon: "https://cdn.lordicon.com/jnikqyih.json",
        screenContents: [{
            label: "Clock type",
            type: "dropdown",
            linkedSetting: "settings.clockType",
            values: [
                ["12h", "12-hour"],
                ["24h", "24-hour"]
            ]
        },
        {
            label: "Clock font",
            type: "dropdown",
            linkedSetting: "settings.clockFont",
            values: [
                ["varela", "Display"],
                ["asap", "Body"],
                ["mono", "Monospace"]
            ]
        },
        {
            label: "Wallpaper",
            type: "scriptbox",
            value: function (div) {
                div.id = "settings-wallpaper-box";
                var defaultWallpapers = [
                    {
                        title: "Default",
                        url: "/assets/images/wallpapers/default.png",
                        preview: "/assets/images/wallpaper-previews/default.png"
                    },
                    {
                        title: "Mountains",
                        url: "/assets/images/wallpapers/mountains.png",
                        preview: "/assets/images/wallpaper-previews/mountains.png"
                    },
                    {
                        title: "Starry (for 100 stars)",
                        url: "/assets/images/wallpapers/starry.png",
                        preview: "/assets/images/wallpaper-previews/starry.png"
                    },
                    {
                        title: "Sunset by Quino Al",
                        url: "/assets/images/wallpapers/sunset.png",
                        preview: "/assets/images/wallpaper-previews/sunset.png"
                    },
                    {
                        title: "Grand Canyon by Bernard Spragg",
                        url: "/assets/images/wallpapers/grand-canyon.jpg",
                        preview: "/assets/images/wallpaper-previews/grand-canyon.png"
                    },
                    {
                        title: "Can We Get Much Higher",
                        url: "/assets/images/wallpapers/canwegetmuchhigher.png",
                        preview: "/assets/images/wallpaper-previews/canwegetmuchhigher.png"
                    }
                ]
                for (let i = 0; i < defaultWallpapers.length;) {
                    var paper = document.createElement("DIV");
                    paper.innerText = defaultWallpapers[i].title;
                    paper.style.backgroundImage = `url(${defaultWallpapers[i].preview})`;
                    paper.dataset.url = defaultWallpapers[i].url;
                    paper.onclick = function (e) {
                        var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                        audio.play();
                        settings.wallpaper = e.target.dataset.url;
                        localStorage.setItem("settings", JSON.stringify(settings));
                    }
                    div.appendChild(paper);
                    ++i;
                }
                var paper = document.createElement("DIV");
                paper.innerText = "Custom wallpaper";
                paper.style.backgroundImage = `url("/assets/images/wallpaper-previews/custom.png")`;
                paper.onclick = function (e) {
                    var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                    audio.play();
                    var url = prompt("Please enter the URL of the wallpaper file. SOME URLS MAY NOT WORK DUE TO THE BROWSER'S BUILT IN SECURITY SYSTEMS.")
                    if (!url) return;
                    settings.wallpaper = url;
                    localStorage.setItem("settings", JSON.stringify(settings));
                }
                div.appendChild(paper);
            }
        },
        {
            label: "Dyslexia-friendly font face",
            type: "dropdown",
            linkedSetting: "settings.dyslexicFont",
            values: [
                [false, "Off"],
                [true, "On"]
            ]
        },
        ]
    },
    {
        screenName: "Passcode Settings",
        screenIcon: "https://cdn.lordicon.com/sbrtyqxj.json",
        screenContents: [{
            label: "What is this?",
            type: "scriptbox",
            value: function (div) {
                div.innerHTML = `<p>
        Fusion OS now supports setting a passcode, which lets you lock down Fusion OS for anyone but you. Note that if you lose your passcode, there is <b>no way to recover,</b> so please write it down somewhere!
        </p>`;
                var btn = document.createElement("btn");
                if (settings.lock.enabled) btn.innerText = "Change passcode"
                else btn.innerText = "Create new passcode";
                btn.onclick = function () {
                print("ive been clicked")
                    if (settings.lock.enabled) {
                        if (prompt("Enter your old passcode.") != settings.lock.passcode) {
                            alert("Incorrect passcode!")
                            return;
                        }
                    }
                    var newPasscode = prompt("Enter your new passcode (between 4 and 6 characters, numbers only)")
                    if (!newPasscode.match(/^[0-9]{4,6}$/)) { alert("Passcode must be a number!"); return; }
                    if (newPasscode.length > 6 || 4 > newPasscode.length) { alert("Passcode must be between 4 and 6 characters!"); return; }
                    if (prompt("Type it again to confirm.") != newPasscode) { alert("Passcodes do not match!"); return; }
                    settings.lock.enabled = true;
                    settings.lock.passcode = newPasscode;
                    loadSettingsScreen(3);
                    alert("Success!");
                    localStorage.setItem("settings", JSON.stringify(settings));
                }
                div.appendChild(btn);
                div.innerHTML += " "
                var btn = document.createElement("btn");
                btn.innerText = "Remove passcode";
                btn.onclick = function () {
                    var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                    audio.play();
                    if (settings.lock.enabled) {
                        if (prompt("Enter your passcode.") != settings.lock.passcode) {
                            alert("Incorrect passcode!")
                            return;
                        }
                    }
                    settings.lock.enabled = false;
                    loadSettingsScreen(3);
                    alert("Success!");
                    localStorage.setItem("settings", JSON.stringify(settings));
                }
                if (settings.lock.enabled) div.appendChild(btn);
            }
        }]
    },
    {
        screenName: "Proxy Settings",
        screenIcon: "https://cdn.lordicon.com/dkhzauae.json",
        screenContents: [{
            label: "Proxy",
            type: "dropdown",
            linkedSetting: "settings.proxy",
            values: [
                ["none", "Don't use a proxy"],
                ["uv", "Use an Ultraviolet proxy"]
            ]
        },
        {
            label: "Proxy URL",
            type: "text",
            linkedSetting: "settings.proxyUrl",
            fallbackSetting: "",
            placeholderText: "Leave blank to use a public proxy."
        }
        ]
    },
    {
        screenName: "Import & Export",
        screenIcon: "https://cdn.lordicon.com/xpgofwru.json",
        screenContents: [{
            label: "What is this?",
            type: "scriptbox",
            value: function (div) {
                div.innerHTML = `<p>
          This is a tool that allows you to import and export all the data stored in Fusion OS. Exporting will export your data in a .cws file, which can be imported easily. Importing will require a .cws file, and will force-restart Fusion OS. Also here is a Factory Reset option, which should only be used as a last resort (and will require your passcode.)
          </p>`
                var btn = document.createElement("btn");
                btn.innerText = "Export"
                btn.onclick = function () {
                    var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                    audio.play();
                    var myFile = new Blob([JSON.stringify({
                        settings: settings,
                        apps: apps,
                        themes: themes,
                    })], { type: 'text/json' });
                    var dlBtn = document.createElement("a");

                    dlBtn.setAttribute("href", window.URL.createObjectURL(myFile));
                    dlBtn.setAttribute("download", "exportedUserData.cws");
                    dlBtn.click();
                    dlBtn.remove();
                }
                div.appendChild(btn);

                var btn = document.createElement("btn");
                btn.innerText = "Import"
                btn.onclick = function () {
                    var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                    audio.play();
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.cws,.json'

                    input.onchange = e => {
                        var file = e.target.files[0];
                        file.text().then((text) => {
                            var json = JSON.parse(text);
                            if (!json?.settings) {
                                alert("Invalid JSON, aborting!");
                                return;
                            }

                            localStorage.setItem("settings", JSON.stringify(json.settings));
                            localStorage.setItem("apps", JSON.stringify(json.apps))
                            localStorage.setItem("themes", JSON.stringify(json.themes))

                            window.onbeforeunload = function (event) { }; // this makes it so it doesn't reload
                            document.location.reload();
                        })
                    }

                    input.click();
                }
                div.appendChild(btn);

                var btn = document.createElement("btn");
                btn.innerText = "Factory Reset"
                btn.onclick = function () {
                    var audio = new Audio("https://fusion-softworks-llc.github.io/assets/sfx/Select.mp3");
                    audio.play();
                    if (prompt(`WAIT A MINUTE!
        
Factory resets will remove ALL your data from Fusion OS, including apps, themes and more. We highly suggest you export your data before you do this. To confirm you want to reset, type "factory reset" into the box below.`).toLowerCase() != "factory reset") {
                        alert("Aborting!")
                        return;
                    }
                    if (settings.lock.enabled) {
                        if (prompt("Please enter your old passcode to confirm.") != settings.lock.passcode) {
                            alert("Incorrect passcode!")
                            return;
                        }
                    }
                    localStorage.clear();
                    alert("Successfully reset Fusion OS. Reloading...");

                    window.onbeforeunload = function (event) { }; // this makes it so it doesn't reload
                    document.location.reload();
                }
                div.appendChild(btn);
            }
        }
        ]
    },
    //https://cdn.lordicon.com/mqdkoaef.json
    {
        screenName: "Basic Store",
        screenIcon: "https://cdn.lordicon.com/mqdkoaef.json",
        screenContents: [{
            type: "scriptbox",
            value: function (div) {
                var btn = document.createElement("btn");
                btn.innerText = "Install Ultrakill"
                btn.onclick = function () {
                    promptInstallApp("/assets/apps/Ultrakill.json")
                }
                div.appendChild(btn);
                var btn = document.createElement("btn");
                btn.innerText = "Install :MOAI:"
                btn.onclick = function () {
                    promptInstallApp("/assets/apps/clsroom.json")
                }
                div.appendChild(btn);
                var btn = document.createElement("btn");
                btn.innerText = "Install SM64"
                btn.onclick = function () {
                    promptInstallApp("/assets/apps/sm64.json")
                }
                div.appendChild(btn);
            }
        }]
    },
    {
        screenName: "About Fusion OS",
        screenIcon: "https://cdn.lordicon.com/kgdqzapd.json",
        screenContents: [{
            type: "scriptbox",
            value: function (div) {
                div.innerHTML = `v${version} ${versionNickname} at ${document.location.hostname}<br>
          Running ${navigator.userAgent}<br>
          <br>`
            }
        }]
    },
]
var settingsCurrentScreen = null;