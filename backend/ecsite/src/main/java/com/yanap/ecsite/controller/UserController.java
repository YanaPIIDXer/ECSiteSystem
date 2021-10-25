package com.yanap.ecsite.controller;

import java.util.List;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Source;
import com.stripe.param.CustomerCreateParams;
import com.yanap.ecsite.auth.AuthUser;
import com.yanap.ecsite.entity.History;
import com.yanap.ecsite.entity.User;
import com.yanap.ecsite.request.UserRegisterRequest;
import com.yanap.ecsite.response.SimpleResultResponse;
import com.yanap.ecsite.response.UserHistoryResponse;
import com.yanap.ecsite.response.UserInfoResponse;
import com.yanap.ecsite.response.UserRegisterResponse;
import com.yanap.ecsite.service.HistoryService;
import com.yanap.ecsite.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


// ユーザコントローラ
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ユーザ新規登録
    @PostMapping("/register")
    public UserRegisterResponse register(@Validated UserRegisterRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new UserRegisterResponse(false, result.getAllErrors().get(0).getDefaultMessage());
        }

        // Stripeの顧客情報
        CustomerCreateParams params = CustomerCreateParams.builder()
                                                            .setName(request.getName())
                                                            .setSource(request.getToken())
                                                            .build();
        Customer stripeCustomer = null;
        try {
            stripeCustomer = Customer.create(params);
        } catch (StripeException e) {
            System.out.println(e.getMessage());
            return new UserRegisterResponse(false, "カード情報の登録に失敗しました");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAddress(request.getAddress());
        user.setStripeId(stripeCustomer.getId());
        if(!userService.save(user)) {
            return new UserRegisterResponse(false, "そのメールアドレスは既に使用されています");     // HACK:アドレス登録済み決め打ちでいいのか・・・？
        }

        return new UserRegisterResponse(true, "");
    }

    // 購入履歴
    @RequestMapping("/history")
    public UserHistoryResponse history(@AuthenticationPrincipal AuthUser authUser) {
        UserHistoryResponse response = new UserHistoryResponse();
        User user = authUser.getUser();
        List<History> histories = user.getHistories();
        for (History history : histories) {
            if (history.getStatus() != History.STATUS_CANCELED) {
                response.add(history.getId(), history.getProduct(), history.getCount(), history.getStatus());
            }
        }
        return response;
    }

    // 注文のキャンセル
    @RequestMapping("/cancel")
    public SimpleResultResponse cancel(@RequestParam("historyId") long historyId, @AuthenticationPrincipal AuthUser authUser) {
        if (!historyService.cancel(historyId)) { return new SimpleResultResponse(false); }

        // authUserのリストは古いままなので再取得して上書きする
        // ※これをやらないと、ログアウトするまで情報が古いまま
        User tmp = userService.find(authUser.getUser().getId());
        authUser.getUser().setHistories(tmp.getHistories());

        return new SimpleResultResponse(true);
    }

    // ユーザ情報取得
    // ユーザ情報変更ページにアクセスした時に叩く
    @RequestMapping("/userinfo")
    public UserInfoResponse userInfo(@AuthenticationPrincipal AuthUser authUser) {
        User user = authUser.getUser();
        String cardFinalNumber = "";
        try {
            Customer stripeCustomer = Customer.retrieve(user.getStripeId());
            Source source = Source.retrieve(stripeCustomer.getDefaultSource());
            cardFinalNumber = source.getCard().getLast4();
        } catch (Exception e) {
            cardFinalNumber = "Error";
        }
        return new UserInfoResponse(user.getName(), user.getEmail(), user.getPassword(), user.getAddress(), cardFinalNumber);
    }
}
