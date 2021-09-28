package com.yanap.ecsite.controller;

import java.util.HashMap;
import java.util.Map;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.PaymentSource;
import com.stripe.model.PaymentSourceCollection;
import com.yanap.ecsite.auth.AuthUser;
import com.yanap.ecsite.entity.Product;
import com.yanap.ecsite.entity.User;
import com.yanap.ecsite.response.CartResponse;
import com.yanap.ecsite.response.SimpleResultResponse;
import com.yanap.ecsite.service.ProductService;
import com.yanap.ecsite.session.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

// カートを扱うAPIのコントローラ
@RestController
@RequestMapping("/user")
@SessionAttributes(types = Cart.class)
public class CartController {
    private static final String SESSION_NAME = "cart";
    
    @Autowired
    private ProductService productService;
    
    // カート用セッション生成
    @ModelAttribute(SESSION_NAME)
    public Cart setupCartSession() {
        return new Cart();
    }

    // カートを取得
    @RequestMapping("/cart")
    public CartResponse get(@ModelAttribute(SESSION_NAME) Cart cart) {
        CartResponse response = new CartResponse();
        for (long id : cart.keySet()) {
            Product product = productService.get(id);
            response.addProduct(product, cart.get(id));
        }
        return response;
    }

    // カートに追加
    @PostMapping("/cart/add")
    public SimpleResultResponse add(@RequestParam("id") long id, @RequestParam("count") int count, @ModelAttribute(SESSION_NAME) Cart cart) {
        int current = 0;
        if (cart.containsKey(id)) {
            current = cart.get(id);
        }
        cart.put(id, current + count);
        
        // 失敗する事ある・・・？
        // 仕様的には今の所無い
        return new SimpleResultResponse(true);
    }

    // 購入処理
    @PostMapping("/cart/buy")
    public SimpleResultResponse buy(@ModelAttribute(SESSION_NAME) Cart cart, @AuthenticationPrincipal AuthUser authUser) {
        User user = authUser.getUser();
        String stripeId = user.getStripeId();
        
        for (long id : cart.keySet()) {
            Product product = productService.get(id);
            Map<String, Object> chargeMap = new HashMap<String, Object>();
            chargeMap.put("amount", product.getPrice() * cart.get(id));
            chargeMap.put("description", product.getName());
            chargeMap.put("currency", "jpy");
            chargeMap.put("customer", stripeId);
            try {
                Charge charge = Charge.create(chargeMap);
                System.out.println(charge.getId());     // TODO:こいつをDBに保存する
            } catch(StripeException e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new SimpleResultResponse(false);
            }
            cart.remove(id);
        }
        return new SimpleResultResponse(true);
    }
}
