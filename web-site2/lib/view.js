const nunjucks = require('nunjucks');
const platform = process.env.platform;
let public_dir = `/dist/static/${platform}`;
const dev =  process.env.NODE_ENV == "dev";
export var request = {path:''};

if (dev) {
    public_dir = `/static/${platform}`;
} 

function createEnv(path, opts) {
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
      noCache = opts.noCache || false,
      watch = opts.watch || false,
      throwOnUndefined = opts.throwOnUndefined || false,
      env = new nunjucks.Environment(
                new nunjucks.FileSystemLoader(path, {
                    noCache: noCache,
                    watch: watch,
                }), {
                    autoescape: autoescape,
                    throwOnUndefined: throwOnUndefined
                });
    require('./filter').default(env);
    require("./tag").default(env);
    return env;
}

export function view(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        request = ctx.request;
        ctx.view = function (view, model) {
            ctx.response.body = env.render(view, {
                ...model,
                public_dir,
            });
            ctx.response.type = 'text/html';
        };
        await next();
    };
}