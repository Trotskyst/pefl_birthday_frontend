<template>
  <div class="container">
    <textarea id="_hiddenCopyText_"></textarea>
    <div style="width: 100%; border: 0px;">
    <div class="btn btn-success btn-sm" @click="copy()" id="cp">Cкопировать код таблицы для форума</div>
    </div>

    <div class="header">
      <div class="header_info">{{header}}</div>
      <div v-if="count > 0" class="header_count">Всего: {{ count }}</div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Менеджер</th>
            <th>Команда</th>
            <th>Дивизион</th>
            <th>Возраст</th>
            <th>Дата рождения</th>
            <th></th>
      </tr>
        </thead>
        <tbody v-for="(birth, index) in paginatedData" :key="index">
          <tr>
            <td>{{ (current_page - 1)*birthday_per_page+index+1 }}</td>
            <td>
              <a :href="birth.link_manager" target="blank" class="black_link">{{ birth.manager }}</a>
            </td>
            <td>
              <a
                :href="birth.link_team"
                v-if="birth.link_team"
                target="blank"
                class="black_link"
              >{{ birth.team }}</a>
            </td>
            <td>
              <span v-if="birth.div && type_info != 'country'">{{birth.country}} ({{birth.div}})</span>
              <span v-if="birth.div && type_info == 'country'">{{birth.div}}</span>
            </td>
            <td>{{ birth.age }}</td>
            <td>{{ birth.birthday }}</td>
            <td>
              <a :href="birth.link_photo" v-if="birth.link_photo" target="blank">ФОТО</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination mt-1 mb-4" v-if="total_count > birthday_per_page">
        <span class="pagitator-links">
          <a
            href="#"
            @click.prevent="changePage(1)"
            class="btn btn-outline-info paginator"
            v-if="hasFirst"
          >в начало</a>
          <a
            href="#"
            @click.prevent="changePage(current_page-1)"
            class="btn btn-outline-info paginator"
            v-if="hasPrev"
          >предыдущая</a>
          <a
            href="#"
            @click.prevent="changePage(num)"
            class="btn paginator"
            :class="{ 'btn-info': current_page === index + 1, 'btn-outline-info': current_page !== index + 1 }"
            v-for="(num, index) in page_count"
            :key="index"
          >{{ num }}</a>

          <a
            href="#"
            @click.prevent="changePage(current_page + 1)"
            class="btn btn-outline-info paginator"
            v-if="hasNext"
          >следующая</a>
          <a
            href="#"
            @click.prevent="changePage(page_count)"
            class="btn btn-outline-info paginator"
            v-if="hasLast"
          >в конец</a>
        </span>
      </div>
    </div>

    <div class="code_for_forum">
    <div id="code_for_forum1">{{code_for_forum1}}</div>
    <div id="code_for_forum2">{{code_for_forum2}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    birthday: Array,
    header: String,
    count: {
      type: Number,
      default: 0
    },
    type_info: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      birthday_per_page: 20,
      todayYear: Number,
      current_page: {
        type: Number,
        default: 1
      },
      code_for_forum1: "",
      code_for_forum2: "",
    };
  },
  created() {
    this.current_page = 1;
  },
  computed: {
    total_count: function() {
      return this.birthday.length;
    },
    hasFirst: function() {
      return this.current_page !== 1;
    },
    hasLast: function() {
      return this.current_page < this.page_count;
    },
    hasPrev: function() {
      return this.current_page > 1;
    },
    hasNext: function() {
      return this.current_page < this.page_count;
    },
    // количество страниц в пагинации
    page_count: function() {
      return Math.ceil(this.total_count / this.birthday_per_page);
    },
    // массив со списком страниц для пагинации
    pages: function() {
      var pages = [];
      for (var i = 0; i <= this.page_count; i++) {
        pages.push(i);
      }
      return pages;
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.birthday_per_page;
      const end = start + this.birthday_per_page;
      return this.birthday.slice(start, end);
    },
    header_code_for_forum() {
      var header = "";
      if (this.type_info === "dates") {
        header = "Дни рождения менеджеров на " + this.header;
      } else if (this.type_info === "alphabet") {
        header = "Дни рождения менеджеров на букву " + this.header;
      } else if (this.type_info === "country") {
        header = "Дни рождения менеджеров. " + this.header;
      } else if (this.type_info === "woman") {
        header = "Дни рождения девушек-менеджеров";
      }
      return header;
    }
  },
  methods: {
    changePage(page_number) {
      this.current_page = page_number;
    },
    copy() {
      // copyToClipboard('.code_for_forum');

      let null_code = "[td] [/td]";

      let code = "[table width=100% bgcolor=#c9f8b7]";
      code += "[tr][td]";
      code += "[center][b]" + this.header_code_for_forum + "[/b][/center]\n";
      code += "[table width=100%]";
      code += "[tr bgcolor=#a3de8f align=center]";
      code += "[td][b]№[/td]";
      code += "[td][b]Менеджер[/td]";
      code += "[td][b]Команда[/td]";
      code += "[td][b]Дивизион[/td]";
      code += "[td][b]Возраст[/td]";
      code += "[td][b]Дата рождения[/td]";
      code += "[td][b]Фото[/td]";
      code += "[/tr]";
      for (var i = 0; i < this.birthday.length; i++) {
        code += "[tr";
        if (Math.round(i / 2) !== i / 2) {
          code += " bgcolor=#a3de8f";
        }
        code += " align=center]";
        code += "[td]" + String(i + 1) + "[/td]";
        code +=
          "[td align=left][url=" +
          this.birthday[i].link_manager.replace("http://pefl.ru/", "") +
          "]" +
          this.birthday[i].manager +
          "[/url][/td]";
        if (this.birthday[i].team) {
          code +=
            "[td align=left][url=" +
            this.birthday[i].link_team.replace("http://pefl.ru/", "") +
            "]" +
            this.birthday[i].team +
            "[/url][/td]";
        } else {
          code += null_code;
        }
        if (this.birthday[i].div) {
          if (this.type_info == "country") {
            code += "[td align=left]" + this.birthday[i].div + "[/td]";
          } else {
            code +=
              "[td align=left]" +
              this.birthday[i].country +
              " (" +
              this.birthday[i].div +
              ")[/td]";
          }
        } else {
          code += null_code;
        }
        code += "[td]" + this.birthday[i].age + "[/td]";
        code += "[td]" + this.birthday[i].birthday + "[/td]";
        if (this.birthday[i].link_photo) {
          code +=
            "[td][url=" +
            this.birthday[i].link_photo.replace("http://pefl.ru/", "") +
            "]ФОТО[/url][/td]";
        } else {
          code += null_code;
        }
        code += "[/tr]";
      }
      code += "[/table]";
      code += "[/td][/tr][/table]";

      this.code_for_forum1 = 'Код для форума ('+String(code.length)+' символов)';
      this.code_for_forum2 = code;

      let targetId = "_hiddenCopyText_";
      // let origSelectionStart, origSelectionEnd;
      let target = document.getElementById(targetId);
      // let copy_button = document.getElementById("cp");
      target.style.display = "block";
      target.textContent = code;
      // let currentFocus = document.activeElement;
      target.focus();
      target.setSelectionRange(0, target.value.length);
      let succeed;
      try {
        succeed = document.execCommand("copy");
      } catch (e) {
        succeed = false;
      }
      // copy_button.focus();
      target.textContent = "";
      target.style.display = "none";
       this.$swal({
									title: "Код для форума скопирован в буфер",
									text: "",
									type: 'success',
								});
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-top: 0px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.header_info {
  flex-grow: 1;
  font-size: 28px;
  font-weight: 500;
}

.header_count {
  font-style: italic;
}

.header_selected {
  width: 100%;
}

.pagitator-links {
  margin-left: auto;
  margin-right: auto;
}
.paginator {
  margin-left: 0.1em;
  margin-right: 0.1em;
}
.pagination {
  width: 100%;
}

.black_link {
  color: black;
}

.black_link:hover {
  color: #2051cf;
}


#code_for_forum1 {
  font-size: 12px;
  font-weight: 600;
}

#code_for_forum2 {
  font-size: 8px;
}

.code_for_forum {
  background-color: #F9D79A;
}

#_hiddenCopyText_ {
  display: none;
}

#cp {
  cursor: pointer;
  float: right;
}

</style>
