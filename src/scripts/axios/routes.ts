const base_url = window.config.API_URL;

const routes: {[index: string]: string} = {
    'auth.login': '/login',
    'auth.register': '/register',
    'auth.logout': '/logout',
    'auth.me': '/me',
    'quiz.all': '/quiz',
    'quiz.create': '/quiz',
    'quiz.id': '/quiz/:0',
    'quiz.questions': '/quiz/:0/questions',
    'quiz.question': '/quiz/:0/questions/:1',
    'quiz.hosts': '/quiz/:0/hosts',
    'quiz.host': '/quiz/:0/hosts/:1',
    'quiz.host.activity': '/quiz/:0/hosts/:1/activity',
    'play.info': '/play/:0/info',
    'play': '/play/:0',
    // info
    appInfo: '/',
}

const routePath = (route: string, params: Array<string|number> = []) => {
    let r = routes[route];
    params.forEach((p, inx) => {
        r = r.replace(':' + inx.toString(), p.toString())
    })
    return r
}

export {
    base_url,
    routePath
}