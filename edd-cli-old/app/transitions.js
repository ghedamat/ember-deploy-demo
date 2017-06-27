export default function() {
  this.transition(
    this.toValue(function(toValue, fromValue) {
      return toValue && fromValue && toValue.get('id') > fromValue.get('id');
    }),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
