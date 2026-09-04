export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[char]));

export function highlightFields(prompt) {
  return escapeHtml(prompt).replace(/(\[[^\]\n]+\])/g, '<mark>$1</mark>');
}
