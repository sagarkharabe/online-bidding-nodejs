const moment = require("moment");
module.exports = {
  truncate: function(str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    } else return str;
  },
  formatDate: function(date, format) {
    return moment(date).format(format);
  },
  select: function(selected, options) {
    return options
      .fn(this)
      .replace(new RegExp('value="' + selected + '"'), '$& selected="selected"')
      .replace(
        new RegExp(">" + selected + "</options>"),
        'selected="selected"$&'
      );
  },
  stripTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  editIcon: function(storyUser, loggedUser, storyId, floating = true) {
    if (storyUser == loggedUser) {
      if (floating) {
        return `<a href='/items/edit/${storyId}' class = "btn-floating halfway-fab red" > <i class="fa fa-pencil"></i></a>`;
      } else {
        return `<a href='/items/edit/${storyId}' > <i class="fa fa-pencil"></i></a>`;
      }
    } else {
      return "";
    }
  },
  ifCon: function(id1, id2) {
    if (id1 == id2) return true;
    else return false;
  }
};
