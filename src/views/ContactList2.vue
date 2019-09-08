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
    this.getContactList();
  },
  methods: {
    //联系人列表
    async getContactList() {
      let res = await this.$Http.contactList();
      this.list = res.data;
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
    async onSave(info) {
      if (this.isEdit) {
        //编辑操作
        let res = await this.$Http.editContact(info);
        if (res.code === 200) {
          Toast("编辑成功");
          this.getContactList();
        }
      } else {
        //新建操作
        let res = await this.$Http.newContactJson(info);
        if (res.code === 200) {
          Toast("新建成功");
          this.getContactList();
        }
      }
      this.showEdit = false;
    },

    // 删除联系人
    async onDelete(info) {
      let res = await this.$Http.delContact({ id: info.id });
      if (res.code === 200) {
        Toast("删除成功");
        this.getContactList();
      }
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
