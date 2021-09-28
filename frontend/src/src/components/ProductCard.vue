<template>
    <div>
        <div class="card">
            <img :src="imageUrl" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ name }}</h5>
                <p class="card-text" v-html="dispDesc"></p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCartModal">カートに入れる</button>
            </div>
        </div>
        
        <div class="modal fade" id="addCartModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">{{ name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label class="form-label">数量</label>
                        <input type="number" v-model="count" class="form-control" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-primary" @click="add" data-bs-dismiss="modal">カートに入れる</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from '../modules/APIConnection';

export default {
    name: "ProductCard",
    props: [
        "id",
        "name",
        "imageUrl",
        "description"
    ],
    data: function () {
        return {
            productId: this.id,
            dispDesc: this.description.replace("\n", "<br />"),
            count: 1
        };
    },
    methods: {
        add: async function () {
            if (!this.$store.getters.isUser) {
                alert("ログインしてください");
                this.$router.push("/login");
                return;
            }
            
            var params = new URLSearchParams();
            params.append("id", this.productId);
            params.append("count", this.count);
            const res = await post("/user/cart/add", params);
            if (res.status != 200 || !res.json.result) {
                alert("追加に失敗しました");
                return;
            }
            if (confirm("追加しました\nカートの中身を表示しますか？")) {
                this.$router.push("/user/cart");
            }
        }
    }
}
</script>
