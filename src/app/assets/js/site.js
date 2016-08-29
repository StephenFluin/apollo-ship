var fabButton = document.querySelector('[md-fab-button]');
var fabActions = document.querySelector('md-fab-actions');

fabButton.addEventListener('click', function() {
  fabActions.classList.toggle('visible');
});
