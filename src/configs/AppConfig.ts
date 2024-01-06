const appSettings = {
    base_url:"https://api.npoint.io",
}

let variable = appSettings

if (__DEV__) {
    variable = appSettings
}

export default variable;