<template>
    <div>
        <h1>ユーザ登録</h1>
        <hr />
        <div>
            <h2>ユーザ情報</h2>
            <label class="form-label">名前</label>
            <input type="text" class="form-control" v-model="name" />
            <label class="form-label">メールアドレス</label>
            <input type="text" class="form-control" v-model="email" />
            <label class="form-label">パスワード</label>
            <input type="password" class="form-control" v-model="password" />
            <label class="form-label">パスワード（確認）</label>
            <input type="password" class="form-control" v-model="confirmPassword" />
            <hr />

            <h2>連絡先情報</h2>
            <label class="form-label">住所</label>
            <input type="text" class="form-control" v-model="address" />
            <hr />

            <h2>クレジットカード情報</h2>
            <p>※安全の為、本物のクレジットカード番号ではなく、テスト用に用意されたクレジットカードの番号を使用します。</p>
            <p>カード番号は下記リストよりコピペしてください。</p>
            <p class="text-danger">※決済システムがテスト環境の為、本物のカード番号を使用すると決済処理が弾かれます。</p>
            <table border="1" align="center">
                <thead>
                    <tr>
                        <th>ブランド</th><th>カード番号</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in dummyCards" :key="item.number">
                        <td>{{ item.name }}</td><td>{{ item.number }}</td>
                    </tr>
                </tbody>
            </table>
            <label>カード番号</label><div id="card-number"></div>
            <label>有効期限</label><div id="card-expiry"></div>
            <label>CVC</label><div id="card-cvc"></div>
            <button class="btn btn-primary" @click="register">登録</button>
        </div>
    </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../modules/Constants';
import { post } from '../modules/APIConnection';

export default {
    name: "UserRegister",
    data: function () {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            dummyCards: [
                {name: "VISA1", number: "4111111111111111"},
                {name: "VISA2", number: "4242424242424242"},
                {name: "VISA3", number: "4012888888881881"},
                {name: "MasterCard1", number: "5555555555554444"},
                {name: "MasterCard2", number: "5105105105105100"},
                {name: "American Express1", number: "378282246310005"},
                {name: "American Express2", number: "371449635398431"},
                {name: "JCB1", number: "3530111333300000"},
                {name: "JCB2", number: "3566002020360505"},
            ],
            cardNumber: "",
            stripe: "",
            numberElem: null,
        };
    },
    mounted: async function () {
        this.stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        const elem = this.stripe.elements();
        
        // https://dev.classmethod.jp/articles/customize-stripe-elements/ より失敬
        const elementStyles = {
            base: {
                color: '#32325D',
                fontWeight: 500,
                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                fontSize: '1.2em',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                color: '#CFD7DF'
                },
                ':-webkit-autofill': {
                color: '#e39f48'
                }
            },
            invalid: {
                color: '#E25950',
                '::placeholder': {
                color: '#FFCCA5'
                }
            }
        };
        const elementClasses = {
            focus: 'focused',
            empty: 'empty',
            invalid: 'invalid'
        };
        this.numberElem = elem.create("cardNumber", {
            style: elementStyles,
            classes: elementClasses
        });
        this.numberElem.mount("#card-number");
        elem.create("cardExpiry",{
            style: elementStyles,
            classes: elementClasses
        }).mount("#card-expiry");
        elem.create("cardCvc", {
            style: elementStyles,
            classes: elementClasses
        }).mount("#card-cvc");
    },
    methods: {
        register: async function () {
            if (this.password != this.confirmPassword) {
                alert("確認用のパスワードが一致しません。");
                return;
            }
            
            const {token, error} = await this.stripe.createToken(this.numberElem);
            if (error) {
                alert(error.message);
                return;
            }
            var params = new URLSearchParams();
            params.append("name", this.name);
            params.append("email", this.email);
            params.append("password", this.password);
            params.append("address", this.address);
            params.append("token", token.id);
            const res = await post("/user/register", params);
            if (res.status != 200) {
                alert("ユーザ登録に失敗しました");
                return;
            }
            if (!res.json.result) {
                alert(res.json.errorMessage);
                return;
            }
            alert("登録に成功しました");
            this.$router.push("/");
        }
    }
}
</script>
