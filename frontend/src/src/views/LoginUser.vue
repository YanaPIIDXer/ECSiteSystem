<template>
    <div>
        <h1>ログイン</h1>
        <hr />
        <div>
            <label class="form-label">メールアドレス</label>
            <input type="text" class="form-control" v-model="email" />
            <label class="form-label">パスワード</label>
            <input type="password" class="form-control" v-model="password" />
            <button @click="login">ログイン</button>
        </div>
    </div>
</template>

<script>
import { post } from '../modules/APIConnection';

export default {
    name: "LoginUser",
    data: function () {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login: async function () {
            var params = new URLSearchParams();
            params.append("email", this.email);
            params.append("password", this.password);
            const res = await post("/user/login", params);
            if (res.status != 200) {
                alert("ログインに失敗しました");
                return;
            }
            this.$store.commit("loginAsUser", res.json.name);
            this.$router.push("/");
        }
    }
}
</script>
