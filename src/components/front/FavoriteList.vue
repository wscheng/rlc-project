<template>
  <div>
    <table class="table table-sm">
      <template v-if="favorites.length > 0">
        <thead>
          <th class="align-middle text-center" style="min-width: 80px">
            商品照片
          </th>
          <th class="align-middle">商品名稱</th>
          <th class="align-middle text-right" style="min-width: 45px">折扣</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="favorite in favorites" :key="favorite[0]">
            <div
              class="favorite-image mx-auto"
              :style="{
                backgroundImage: `url(${favorite[1].imageUrl})`
              }"
            />
            <td class="align-middle">{{ favorite[1].title }}</td>
            <td class="align-middle">
              <del
                class="del-price"
                v-if="favorite[1].origin_price != favorite[1].price"
                >{{ favorite[1].origin_price | currency }}</del
              >
              <div v-else>{{ favorite[1].price | currency }} 元</div>
              <div
                class="special-price"
                v-if="favorite[1].origin_price != favorite[1].price"
              >
                <i>{{ favorite[1].price | currency }}</i>
              </div>
            </td>
            <!-- TODO don't hide the drop-down menu after delete button clicked -->
            <td class="align-middle text-center">
              <a
                href="#"
                class="text-muted"
                @click.prevent="removeFavorite(favorite[1])"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </a>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tr>
          <td class="align-middle text-center">沒有追蹤的商品</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  computed: {
    ...mapState("favoriteModule", ["favorites"])
  },
  methods: {
    removeFavorite(favorite) {
      this.$emit("remove-favorite", favorite);
    }
  }
};
</script>

<style lang="scss" scoped>
.favorite-image {
  width: 60px;
  height: 80px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.del-price {
  color: grey;
}
.special-price {
  color: #911400;
}
</style>
