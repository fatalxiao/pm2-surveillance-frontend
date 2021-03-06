import ac from 'components/AsyncComponent';

export function configureRoutes(store) {
    return [{
        path: '/',
        component: ac(() => import(
            /* webpackChunkName: "Root" */
            'containers/Root'), store),
        routes: [{
            path: '/app',
            component: ac(() => import(
                /* webpackChunkName: "App" */
                'containers/app/App'), store),
            routes: [{
                path: '/app/pm',
                component: ac(() => import(
                    /* webpackChunkName: "PM" */
                    'containers/app/pm/PM'), store),
                routes: [{
                    path: '/app/pm/applications',
                    component: ac(() => import(
                        /* webpackChunkName: "Applications" */
                        'containers/app/pm/applications/Applications'), store)
                }, {
                    path: '/app/pm/application/:name',
                    component: ac(() => import(
                        /* webpackChunkName: "Application" */
                        'containers/app/pm/application/Application'), store),
                    routes: [{
                        path: '/app/pm/application/:name/overview',
                        component: ac(() => import(
                            /* webpackChunkName: "ApplicationOverView" */
                            'containers/app/pm/application/overview/ApplicationOverView'), store)
                    }, {
                        path: '/app/pm/application/:name/config',
                        component: ac(() => import(
                            /* webpackChunkName: "ApplicationConfig" */
                            'containers/app/pm/application/config/ApplicationConfig'), store)
                    }, {
                        path: '/app/pm/application/:name/setting',
                        component: ac(() => import(
                            /* webpackChunkName: "ApplicationSetting" */
                            'containers/app/pm/application/setting/ApplicationSetting'), store)
                    }]
                }]
            }]
        }]
    }];
}

export const DEFAULT_ROUTE = '/app';

export function getRoute(pathName, state) {

    if (!pathName) {
        return;
    }

    return traverseData(configureRoutes(state)[0], pathName);

}

export function traverseData(node, pathName) {

    if (!node || !node.path || !pathName) {
        return;
    }

    if (new RegExp(`^${node.path.replace(/\//g, '\\\/').replace(/:[^/]*/g, '.*')}$`).test(pathName)) {
        return node;
    }

    if (node.routes && node.routes.length > 0) {

        for (let i = 0, len = node.routes.length; i < len; i++) {

            // traverse child node
            const obj = traverseData(node.routes[i], pathName, i);

            // if finded in child node
            if (obj) {
                return obj;
            }

        }
    }

    return;

}
