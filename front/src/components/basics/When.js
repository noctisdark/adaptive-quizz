const When = ({ predicate, then, otherwise }) =>
  predicate() ? then : otherwise;

export default When;
