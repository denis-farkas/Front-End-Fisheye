/* eslint-disable no-unused-vars */
/* justification: l'auto-fix d'eslint casse ce code sans explication, il est donc neutralisé pour ce script. */

function DropDown(dropDown) {
  const [toggler, menu] = dropDown.children;

  // eslint-disable-next-line consistent-return
  const handleClickOut = (e) => {
    if (!dropDown) {
      return document.removeEventListener('click', handleClickOut);
    }

    if (!dropDown.contains(e.target)) {
      this.toggle(false);
    }
  };

  const setValue = (item) => {
    const val = item.textContent;
    toggler.textContent = val;
    this.value = val;
    this.toggle(false);
    dropDown.dispatchEvent(new Event('change'));
    toggler.focus();
  };

  const nextNode = document.querySelector('.portfolio_body').firstChild;

  const handleItemKeyDown = (e) => {
    e.preventDefault();

    if (e.keyCode === 38 && e.target.previousElementSibling) {
      // up
      e.target.previousElementSibling.focus();
    } else if (e.keyCode === 40 && e.target.nextElementSibling) {
      // down
      e.target.nextElementSibling.focus();
    } else if (e.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      setValue(e.target);
    }
  };

  const handleToggleKeyPress = (e) => {
    e.preventDefault();

    if (e.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      this.toggle(true);
    } else if (e.keyCode === 9) {
      this.toggle(false);
    }
  };

  toggler.addEventListener('keydown', handleToggleKeyPress);
  toggler.addEventListener('click', () => this.toggle());
  [...menu.children].forEach((item) => {
    item.addEventListener('keydown', handleItemKeyDown);
    item.addEventListener('click', () => setValue(item));
  });

  this.element = dropDown;

  this.value = toggler.textContent;

  this.toggle = (expand = null) => {
    // eslint-disable-next-line no-param-reassign
    expand =
      expand === null ? menu.getAttribute('aria-expanded') !== 'true' : expand;

    menu.setAttribute('aria-expanded', expand);

    if (expand) {
      toggler.classList.add('active');
      menu.children[0].focus();
      document.addEventListener('click', handleClickOut);
      dropDown.dispatchEvent(new Event('opened'));
    } else {
      toggler.classList.remove('active');
      dropDown.dispatchEvent(new Event('closed'));
      document.removeEventListener('click', handleClickOut);
    }
  };
}

const dropDown = new DropDown(document.getElementById('dropdown'));

dropDown.element.addEventListener('change', (e) => {
  // eslint-disable-next-line no-undef
  changeFilter(dropDown.value);
});
