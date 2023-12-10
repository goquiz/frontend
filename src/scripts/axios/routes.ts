const base_url = window.config.API_URL;

const routes: {[index: string]: string} = {
    "auth.login": "/login",
    "auth.register": "/register",
    "auth.me": "/me",
}

const routePath = (route: string) => {
    return routes[route];
}

export {
    base_url,
    routePath
}