<template>
  <div class="favorites" style="background-color: #f1ede9;">
    <div class="favorites-title-block text-center">
      <h5 class="py-2">我的收藏</h5>
    </div>
    <FavoriteList @remove-favorite="removeFavorite" />
    <!-- TODO add undo function after remove -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FavoriteList from "@/components/front/FavoriteList.vue";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  components: {
    FavoriteList
  },
  data() {
    return {
      currentCategory: { title: "全部書籍", id: "book-all" },
      orderOptions: [],
      orderBy: "",
      filterText: "",
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    ...mapActions("favoriteModule", ["removeFavorite", "getFavorites"])
  },
  computed: {
    ...mapState("favoriteModule", ["favorites"])
  },
  created() {
    this.getFavorites();
  }
};
</script>

<style lang="scss" scoped>
.favorites {
  margin-top: 104px;
  padding: 20px 50px 20px 50px;
  @media (max-width: 820px) {
    padding: 20px 50px 20px;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    padding: 20px 10px 20px;
  }
}

.favorites-title-block {
  color: white;
  background: #7b2f3d;
}
</style>
