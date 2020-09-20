
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
  item.icon = item.icon = "weapons/" + item.name.replaceAll(" ", "_") + ".png"
  return item;
}));

$(document).ready(function () {

  console.log("ready!");

  drawList(allItems);

  $("#search").on('input', function (e) {
    var newList = filterList();
    drawList(newList);
  });

  $("#red").change(function (e) {
    var newList = filterList();
    drawList(newList);
  });

  $("#violet").change(function (e) {
    var newList = filterList();
    drawList(newList);
  });

  $("#green").change(function (e) {
    var newList = filterList();
    drawList(newList);
  });
});

function filterList() {
  var text = $("#search").val();
  var tags = [];

  var red = $("#red")[0].checked;
  var violet = $("#violet")[0].checked;
  var green = $("#green")[0].checked;

  if (red) { tags.push('red'); }
  if (violet) { tags.push('violet'); }
  if (green) { tags.push('green'); }

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
		  <div class='description'>${item.description}</div>
		  <div class='tags'>Tags : ${item.tags ?? 'n/a'}</div>`;
    $('.item-content').html(html);
  }
}


