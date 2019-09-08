<template>
  <div class="home">
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { Popup, ContactList, ContactEdit, Toast } from "vant";

export default {
  name: "cantactList",
  components: {
    [Popup.name]: Popup,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit
  },
  data() {
    return {
      instance: null,
      editingContact: {},
      showEdit: false,
      isEdit: false,
      list: []
    };
  },
  created() {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 5000
    });
    this.getContactList();
  },
  methods: {
    //联系人列表
    getContactList() {
      this.instance
        .get("/contactList")
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.list = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          Toast("请求失败，请稍后重试");
        });
    },
    // 添加联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
      this.editingContact = {};
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },

    // 保存联系人
    onSave(info) {
      if (this.isEdit) {
        //编辑操作
        this.instance
          .put("/contact/edit", info)
          .then(res => {
            if (res.data.code === 200) {
              Toast("编辑成功");
              this.getContactList();
            }
          })
          .catch(() => {
            Toast("请求失败，请稍后重试");
          });
      } else {
        //新建操作
        this.instance
          .post("/contact/new/json", info)
          .then(res => {
            if (res.data.code === 200) {
              Toast("新建成功");
              this.getContactList();
            }
          })
          .catch(() => {
            Toast("请求失败，请稍后重试");
          });
      }
      this.showEdit = false;
    },

    // 删除联系人
    onDelete(info) {
      this.instance
        .delete("/contact", {
          params: {
            id: info.id
          }
        })
        .then(() => {
          Toast("删除成功");
          this.getContactList();
        })
        .catch(() => {
          Toast("请求失败，请稍后重试");
        });
      this.showEdit = false;
    }
  }
};
</script>
<style scoped>
.van-contact-list__add {
  z-index: 0;
}
.van-popup {
  height: 100%;
}
</style>
