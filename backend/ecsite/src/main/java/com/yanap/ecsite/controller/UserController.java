package com.yanap.ecsite.controller;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import com.yanap.ecsite.auth.AuthUser;
import com.yanap.ecsite.config.ApplicationConfig;
import com.yanap.ecsite.entity.History;
import com.yanap.ecsite.entity.User;
import com.yanap.ecsite.request.UserInfoRequest;
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
    public UserRegisterResponse register(@Validated UserInfoRequest request, BindingResult result) {
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
    public UserHistoryResponse history(@RequestParam(name = "page", required = false) Integer page, @AuthenticationPrincipal AuthUser authUser) {
        if (page == null) {
            page = 1;
        }
        
        User user = authUser.getUser();
        List<History> histories = user.getHistories();
        int maxPage = histories.size() / ApplicationConfig.HISTORY_COUNT_BY_PAGE;
        if ((histories.size() % ApplicationConfig.HISTORY_COUNT_BY_PAGE) > 0) {
            maxPage++;
        }

        UserHistoryResponse response = new UserHistoryResponse(maxPage, ApplicationConfig.HISTORY_COUNT_BY_PAGE);
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYY/mm/dd HH:mm:ss");
        int fromIndex = (page - 1) * ApplicationConfig.HISTORY_COUNT_BY_PAGE;
        int toIndex = page * ApplicationConfig.HISTORY_COUNT_BY_PAGE;
        if (toIndex >= histories.size()) {
            toIndex = histories.size() - 1;
        }
        histories = histories.subList(fromIndex, toIndex);
        for (History history : histories) {
            if (history.getStatus() != History.STATUS_CANCELED) {
                response.add(history.getId(), history.getProduct(), history.getCount(), dateTimeFormatter.format(history.getDateTime()), history.getStatus());
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
    @RequestMapping("/info")
    public UserInfoResponse userInfo(@AuthenticationPrincipal AuthUser authUser) {
        User user = authUser.getUser();
        String cardFinalNumber = "";
        try {
            Customer customer = Customer.retrieve(user.getStripeId());
            // 参考：https://stripe.com/docs/api/cards/retrieve
            Card card = (Card) customer.getSources().retrieve(customer.getDefaultSource());
            cardFinalNumber = card.getLast4();
        } catch (StripeException e) {
            cardFinalNumber = e.getMessage();
        }
        return new UserInfoResponse(user.getName(), user.getEmail(), user.getAddress(), cardFinalNumber);
    }

    // ユーザ情報更新
    @PostMapping("/update")
    public UserRegisterResponse updateInfo(@Validated UserInfoRequest request, BindingResult result, @AuthenticationPrincipal AuthUser authUser) {
        if (result.hasErrors()) {
            return new UserRegisterResponse(false, result.getAllErrors().get(0).getDefaultMessage());
        }

        User user = authUser.getUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAddress(request.getAddress());

        String token = request.getToken();
        if (token != "") {
            try {
                Customer customer = Customer.retrieve(user.getStripeId());
                Map<String, Object> createMap = new HashMap<String, Object>();
                createMap.put("source", token);
                Card card = (Card) customer.getSources().create(createMap);

                Map<String, Object> updateMap = new HashMap<String, Object>();
                updateMap.put("default_source", card.getId());
                customer.update(updateMap);
            } catch (StripeException e) {
                System.out.println(e.getMessage());
                return new UserRegisterResponse(false, "カード情報の登録に失敗しました");    
            }
        }

        if(!userService.save(user)) {
            return new UserRegisterResponse(false, "そのメールアドレスは既に使用されています");
        }

        return new UserRegisterResponse(true, "");
    }
}
