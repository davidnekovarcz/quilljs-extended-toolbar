//
//
// PLACEHOLDER
//

const placeholder_tag = 'x-placeholder'

let Inline = Quill.import('blots/inline');

class PlaceholderBlot extends Inline { }

PlaceholderBlot.blotName = 'placeholder';
PlaceholderBlot.tagName = placeholder_tag;
Quill.register(PlaceholderBlot);

//
//
// IF
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
