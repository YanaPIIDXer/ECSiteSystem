<template>
    <div class="card">
        <img :src="imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text" v-html="dispDesc"></p>
            <button class="btn btn-primary">カートに入れる</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductCard",
    props: [
        "name",
        "imageUrl",
        "description"
    ],
    data: function () {
        return {
            dispDesc: this.description.replace("\n", "<br />")
        };
    }
}
</script>
