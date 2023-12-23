const base_url = window.config.API_URL;

const routes: {[index: string]: string} = {
    'auth.login': '/login',
    'auth.register': '/register',
    'auth.me': '/me',
    'quiz.all': '/quiz',
    'quiz.create': '/quiz',
    'quiz.id': '/quiz/:0',
    'quiz.questions': '/quiz/:0/questions',
    'quiz.question': '/quiz/:0/questions/:1',
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