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
            console.log(res);
        }
    }
}
</script>

