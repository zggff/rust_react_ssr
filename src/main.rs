use actix_files as fs;
use actix_web::{
    get, http::StatusCode, middleware::Logger, App, HttpRequest, HttpResponse, HttpServer,
    Responder,
};
use std::fs::read_to_string;

#[macro_use]
extern crate lazy_static;

lazy_static! {
    pub static ref JS_CODE: String = {
        let polyfill = r##"function TextEncoder(){}function TextDecoder(){}TextEncoder.prototype.encode=function(e){for(var o=[],t=e.length,r=0;r<t;){var n=e.codePointAt(r),c=0,f=0;for(n<=127?(c=0,f=0):n<=2047?(c=6,f=192):n<=65535?(c=12,f=224):n<=2097151&&(c=18,f=240),o.push(f|n>>c),c-=6;c>=0;)o.push(128|n>>c&63),c-=6;r+=n>=65536?2:1}return o},TextDecoder.prototype.decode=function(e){for(var o="",t=0;t<e.length;){var r=e[t],n=0,c=0;if(r<=127?(n=0,c=255&r):r<=223?(n=1,c=31&r):r<=239?(n=2,c=15&r):r<=244&&(n=3,c=7&r),e.length-t-n>0)for(var f=0;f<n;)c=c<<6|63&(r=e[t+f+1]),f+=1;else c=65533,n=e.length-t;o+=String.fromCodePoint(c),t+=n+1}return o};"##;
        let code = read_to_string("./client/dist/ssr/index.js").expect("no js file found");
        let result = format!("{};{}", polyfill, code);
        result
    };
}

use ssr::SsrV8;

mod ssr;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();
    env_logger::init();
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(fs::Files::new("/styles", "./client/dist/ssr/styles/").show_files_listing())
            .service(fs::Files::new("/images", "./client/dist/ssr/images/").show_files_listing())
            .service(fs::Files::new("/scripts", "./client/dist/client/").show_files_listing())
            .service(index)
            .wrap(Logger::new("%a %{User-Agent}i"))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await?;

    Ok(())
}

#[get("{url}*")]
async fn index(req: HttpRequest) -> impl Responder {
    let props = format!(
        r##"{{
            "location": "{}",
            "context": {{}}
        }}"##,
        req.uri()
    );

    let js = SsrV8::new(JS_CODE.to_owned(), "SSR");
    let html = js.render_to_string(Some(&props));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(html)
}
