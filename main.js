
function render(props) {
  return function (tok, i) { return (i % 2) ? props[tok] : tok; };
}


allItems = [];

allItems.push(...items.map((item) => {
  item.itemType = 'item';
  item.name = item.name.replaceAll("'", "");
  item.icon = item.icon = "items/" + item.name.replaceAll(" ", "_") + ".png"
  return item;
}));

allItems.push(...weapons.map((item) => {
  item.itemType = 'weapon';
  item.name = item.name.replaceAll("'", "");
  item.icon = "weapons/" + item.name.replaceAll(" ", "_") + ".png";
  item.animation = "weapons_animations/" + item.name.replaceAll(" ", "_") + "_firing.gif";
  return item;
}));


colors = allItems.map(i => i.tags)
.flat(1)
.filter((value, index, self) => self.indexOf(value) === index)
.filter(v => v)
.sort((a, b) => a.localeCompare(b));

console.log(colors);

$(document).ready(function () {

  console.log("ready!");

  drawList(allItems);

  $('.filters').append(colors.map((color) => `<input id="${color}" type="checkbox" /><label for="${color}">${color}</label>`));

  $(".filters > input").on('input', function (e) {
    var newList = filterList();
    drawList(newList);
  });

  // $('.filters > input[type="checkbox"]').on('click', () => {
  //   var newList = filterList();
  //   drawList(newList);
  // });

  // $("#red").change(function (e) {
  //   var newList = filterList();
  //   drawList(newList);
  // });

  // $("#violet").change(function (e) {
  //   var newList = filterList();
  //   drawList(newList);
  // });

  // $("#green").change(function (e) {
  //   var newList = filterList();
  //   drawList(newList);
  // });
});

function filterList() {
  var text = $("#search").val();
  var tags = [];


  $('.filters > input:checkbox:checked').each(function(index) {
    tags.push($(this).attr('id'));
  });

  var newList = allItems.filter(function (item) {
    return item.name.toLowerCase().includes(text.toLowerCase()) && tags.every(function (tag) { return item.tags?.includes(tag); });
  });

  return newList;

}

function drawList(items) {

  $('.list-items').html(items.filter((item) => item.itemType === 'item').map(function (item, index) {
    var html = `<div class='list-group-item' data-name='${item.name}'>
		  <img src='${item.icon}' />
	    </div>`;
    return html;
  }));


  $('.list-weapons').html(items.filter((item) => item.itemType === 'weapon').map(function (item, index) {
    var html = `<div class='list-group-item' data-name='${item.name}'>
		  <img src='${item.icon}' />
	    </div>`;
    return html;
  }));

  $('.list-group-item').mouseenter(function (e) {
    drawItem(e);
  });

  $('.list-group-item').mouseleave(function (e) {
    $('.item-content').html('');
  });

}

function drawItem(e) {
  var name = $(e.currentTarget).data('name');
  const item = allItems.find(function (i) {
    return i.name === "" + name;
  });
  if (item) {
    var html = `<img src='${item.icon}' />
		  <h1 class='title'>${item.name}</h1>
      <div class='description'>${item.description}</div>`

    if (item.tags)
      html += `<h3>Tags :</h3> ${item.tags ?? 'n/a'}`;

    if (item.ability)
      html += `<h3>Ability : </h3>${item.ability ?? 'n/a'}`;

    if (item.type)
      html += `<h3>Type :</h3> ${item.type ?? 'n/a'}`;

    if (item.output)
      html += `<h3>Output : </h3>${item.output ?? 'n/a'}`;

    if (item.rate_of_fire)
      html += `<h3>Rate of fire : </h3>${item.rate_of_fire ?? 'n/a'}`;

    if (item.notes)
      html += `<h3>Notes : </h3>${item.notes ?? 'n/a'}`;

    if (item.animation) {
      html += `<h3>Animation : </h3>`;
      html += `<img class="weapons_animations" src="${item.animation}" />`;
    }

    $('.item-content').html(html);
  }
}