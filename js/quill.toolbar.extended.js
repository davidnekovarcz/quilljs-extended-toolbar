//
//
// PLACEHOLDER TAG
//

const placeholder_tag = 'x-placeholder'

let Inline = Quill.import('blots/inline');

class PlaceholderBlot extends Inline { }

PlaceholderBlot.blotName = 'placeholder';
PlaceholderBlot.tagName = placeholder_tag;
Quill.register(PlaceholderBlot);

//
//
// IF TAG
//

const if_tag = 'x-if'

let Block = Quill.import('blots/block');

class IfBlot extends Block {
  static create(value) {
    let node = super.create();
    node.setAttribute('data-variable', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-variable');
  }
}

IfBlot.blotName = 'if';
IfBlot.tagName = 'x-if';
Quill.register(IfBlot);

//
//
// TABLE TAG
//

let BlockEmbed = Quill.import('blots/block');

class TbodyBlot extends Inline { }

TbodyBlot.blotName = 'tbody';
TbodyBlot.tagName = 'tbody';
Quill.register(TbodyBlot);

class TrBlot extends Inline { }

TrBlot.blotName = 'tr';
TrBlot.tagName = 'tr';
Quill.register(TrBlot);

class TdBlot extends Inline { }

TdBlot.blotName = 'td';
TdBlot.tagName = 'td';
Quill.register(TdBlot);

class TableBlot extends BlockEmbed {
  static create(value) {
    if(!Array.isArray(value)) {
      value = [
        ["Column A", "Column B", "Column C"],
        ["Row 1", "Row 2", "Row 3"]
      ]
    }
    let node = super.create(value);
    let tbody = document.createElement('tbody');
    node.appendChild(tbody);

    value.forEach(row => {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      row.forEach(cell => {
        let td = document.createElement('td');
        td.innerText = cell;
        tr.appendChild(td);
      })
    })
    return node;
  }

  static value(node) {
    var ret = [];
    if(node.tagName === 'table') {
      let rows = node.rows;
      for (let i = 0; i < rows.length; i++) {
        ret[i] = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
          ret[i].push(rows[i].cells[j].innerText);
        }
      }
    }
    return ret;
  }
}

TableBlot.blotName = 'table';
TableBlot.tagName = 'table';
Quill.register(TableBlot);

//
//
// REGISTER NEW HTML ELEMENTS
//

document.registerElement(placeholder_tag, {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: 'span'
});

document.registerElement(if_tag, {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: 'div'
});
