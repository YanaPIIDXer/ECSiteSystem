package com.yanap.ecsite.config;

import org.apache.catalina.Context;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.stereotype.Component;

@Component
public class CookieConfig implements TomcatContextCustomizer {
    @Override
    public void customize(Context context) {
        Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
        cookieProcessor.setSameSiteCookies("none");
        context.setCookieProcessor(cookieProcessor);
    }
    
}
