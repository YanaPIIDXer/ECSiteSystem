<template>
    <div>
        <label>パスワード</label><input type="password" v-model="password" /><br />
        <button @click="login">ログイン</button>
    </div>
</template>

<script>
import { post } from '../modules/APIConnection';

export default {
    name: "LoginAdmin",
    data: function () {
        return {
            password: ""
        };
    },
    methods: {
        login: async function () {
            var params = new URLSearchParams();
            params.append("name", "admin");
            params.append("password", this.password);
            const res = await post("/admin/login", params);
            if (res.status != 200) {
                alert("ログインに失敗しました");
                return;
            }
            this.$store.commit("loginAsAdmin");
            this.$router.push("/admin/top");
        }
    }
}
</script>

